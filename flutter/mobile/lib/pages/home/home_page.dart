import 'package:flutter/material.dart';

import '../../models/product.dart';
import '../../models/user.dart';
import '../../models/cart_item.dart';

import '../../services/auth_service.dart';
import '../../services/product_service.dart';
import '../../services/cart_service.dart';

import '../compare/compare_page.dart';
import 'widgets/page_header.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  User? user;
  List<Product> products = [];
  bool loading = true;

  int cartCount = 0;

  // ===== COMPARE (GIỮ NGUYÊN) =====
  List<int> compareList = [];

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _loadData();
    });
  }

  // ================= LOAD USER + PRODUCTS (GIỮ NGUYÊN) =================
  Future<void> _loadData() async {
    try {
      User? u;
      try {
        u = await AuthService.getMe();
      } catch (_) {
        u = null;
      }

      final p = await ProductService.getProducts();

      if (mounted) {
        setState(() {
          user = u;
          products = p;
          loading = false;
        });
      }
    } catch (_) {
      if (mounted) setState(() => loading = false);
    }
  }

  // ================= ADD TO CART (GIỮ NGUYÊN) =================
  Future<void> addToCart(Product p) async {
    if (user == null) {
      Navigator.pushNamed(context, "/login");
      return;
    }

    await CartService.addItem(
      user!.email,
      CartItem(
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: 1,
        image: p.imageUrls.isNotEmpty ? p.imageUrls.first : null,
      ),
    );

    if (mounted) {
      setState(() => cartCount++);
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text("Đã thêm vào giỏ hàng 🛒")));
    }
  }

  // ================= COMPARE (GIỮ NGUYÊN) =================
  void addToCompare(int id) {
    setState(() {
      if (compareList.contains(id)) return;
      if (compareList.length == 2) compareList.removeAt(0);
      compareList.add(id);
    });
  }

  void removeFromCompare(int id) {
    setState(() => compareList.remove(id));
  }

  void goToCompare() {
    if (compareList.length < 2) return;

    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => ComparePage(p1: compareList[0], p2: compareList[1]),
      ),
    );
  }

  // ================= UI =================
  @override
  Widget build(BuildContext context) {
    final isMobile = MediaQuery.of(context).size.width < 1024;

    return Scaffold(
      appBar: PageHeader(
        user: user,
        cartCount: cartCount,
        onLogout: () async {
          await AuthService.logout();
          if (mounted) {
            setState(() {
              user = null;
              cartCount = 0;
            });
          }
        },
      ),

      floatingActionButton: isMobile && compareList.length == 2
          ? FloatingActionButton.extended(
              onPressed: goToCompare,
              backgroundColor: const Color(0xff22c55e),
              icon: const Icon(Icons.compare),
              label: const Text("So sánh"),
            )
          : null,

      body: loading
          ? const Center(child: CircularProgressIndicator())
          : Center(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 1440),
                child: Padding(
                  padding: const EdgeInsets.all(8),
                  child: isMobile
                      ? _buildContent()
                      : Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            SizedBox(width: 260, child: _buildSidebar()),
                            const SizedBox(width: 28),
                            Expanded(child: _buildContent()),
                          ],
                        ),
                ),
              ),
            ),
    );
  }

  // ================= SIDEBAR (GIỮ NGUYÊN) =================
  Widget _buildSidebar() {
    final canCompare = compareList.length == 2;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _box(
          title: "So sánh (${compareList.length}/2)",
          child: compareList.isEmpty
              ? const Text("Chọn 2 sản phẩm để so sánh")
              : Column(
                  children: compareList.map((id) {
                    final p = products.firstWhere((e) => e.id == id);
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 8),
                      child: Row(
                        children: [
                          Image.network(
                            p.imageUrls.isNotEmpty ? p.imageUrls.first : "",
                            width: 42,
                            height: 42,
                            fit: BoxFit.contain,
                          ),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Text(
                              p.name,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                          IconButton(
                            icon: const Icon(Icons.close, color: Colors.red),
                            onPressed: () => removeFromCompare(id),
                          ),
                        ],
                      ),
                    );
                  }).toList(),
                ),
        ),
        const SizedBox(height: 12),
        if (canCompare)
          SizedBox(
            width: double.infinity,
            child: ElevatedButton.icon(
              icon: const Icon(Icons.compare),
              label: const Text("So sánh ngay"),
              onPressed: goToCompare,
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xff22c55e),
                padding: const EdgeInsets.symmetric(vertical: 14),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(14),
                ),
              ),
            ),
          ),
      ],
    );
  }

  Widget _box({required String title, required Widget child}) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
        boxShadow: const [
          BoxShadow(
            color: Color.fromRGBO(0, 0, 0, .08),
            blurRadius: 22,
            offset: Offset(0, 8),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: const TextStyle(fontWeight: FontWeight.w800)),
          const SizedBox(height: 14),
          child,
        ],
      ),
    );
  }

  // ================= CONTENT =================
  Widget _buildContent() {
    return GridView.builder(
      gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
        maxCrossAxisExtent: 260,
        mainAxisSpacing: 26,
        crossAxisSpacing: 26,
        childAspectRatio: 0.60,
      ),
      itemCount: products.length,
      itemBuilder: (_, i) {
        final p = products[i];
        return _ProductCard(
          product: p,

          selected: compareList.contains(p.id),
          onCompare: () => addToCompare(p.id),
          onAddCart: () => addToCart(p),
        );
      },
    );
  }
}

String formatPrice(double price) {
  final value = price.toStringAsFixed(0);
  final buffer = StringBuffer();

  for (int i = 0; i < value.length; i++) {
    final reverseIndex = value.length - i;
    buffer.write(value[i]);
    if (reverseIndex > 1 && reverseIndex % 3 == 1) {
      buffer.write('.');
    }
  }

  return buffer.toString();
}

// ================= PRODUCT CARD =================
class _ProductCard extends StatelessWidget {
  final Product product;
  final bool selected;
  final VoidCallback onCompare;
  final VoidCallback onAddCart;

  const _ProductCard({
    required this.product,
    required this.selected,
    required this.onCompare,
    required this.onAddCart,
  });

  @override
  Widget build(BuildContext context) {
    final out = product.quantityInStock == 0;

    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(22),
        boxShadow: const [
          BoxShadow(
            color: Color.fromRGBO(0, 0, 0, .08),
            blurRadius: 25,
            offset: Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        children: [
          GestureDetector(
            onTap: () {
              Navigator.pushNamed(
                context,
                "/product-detail",
                arguments: product.id,
              );
            },
            child: Padding(
              padding: const EdgeInsets.all(12),
              child: Image.network(
                product.imageUrls.isNotEmpty ? product.imageUrls.first : "",
                height: 120,
                fit: BoxFit.contain,
              ),
            ),
          ),

          Expanded(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    product.name,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(fontWeight: FontWeight.w800),
                  ),

                  const SizedBox(height: 6),
                  if (product.totalReviews != null && product.totalReviews! > 0)
                    Row(
                      children: [
                        const Icon(Icons.star, size: 14, color: Colors.amber),
                        const SizedBox(width: 4),
                        Text(
                          product.avgRating!.toStringAsFixed(1),
                          style: const TextStyle(fontWeight: FontWeight.w600),
                        ),
                        const SizedBox(width: 4),
                        Text(
                          "(${product.totalReviews})",
                          style: const TextStyle(
                            color: Colors.grey,
                            fontSize: 12,
                          ),
                        ),
                      ],
                    ),

                  const SizedBox(height: 4),
                  Row(
                    children: [
                      Text(
                        formatPrice(product.price),
                        style: const TextStyle(
                          color: Color(0xffef4444),
                          fontSize: 17,
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                      const SizedBox(width: 4),
                      const Padding(
                        padding: EdgeInsets.only(bottom: 2),
                        child: Text(
                          "₫",
                          style: TextStyle(
                            color: Color(0xffef4444),
                            fontSize: 13,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ),
                    ],
                  ),

                  const SizedBox(height: 10),

                  Row(
                    children: [
                      Expanded(
                        child: SizedBox(
                          height: 38,
                          child: ElevatedButton(
                            onPressed: onCompare,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: selected
                                  ? Colors.green
                                  : const Color(0xffeef2ff),
                              foregroundColor: Colors.black,
                            ),
                            child: Text(selected ? "✓ Đã chọn" : "+ So sánh"),
                          ),
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: SizedBox(
                          height: 38,
                          child: ElevatedButton(
                            onPressed: out ? null : onAddCart,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xff2563eb),
                            ),
                            child: const Text("🛒 Thêm"),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
