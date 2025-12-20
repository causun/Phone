import 'package:flutter/material.dart';

import '../../models/cart_item.dart';
import '../../models/user.dart';

import '../../services/auth_service.dart';
import '../../services/cart_service.dart';

import '../home/widgets/page_header.dart';

class CartPage extends StatefulWidget {
  const CartPage({super.key});

  @override
  State<CartPage> createState() => _CartPageState();
}

class _CartPageState extends State<CartPage> {
  User? user;
  List<CartItem> cart = [];
  bool loading = true;

  @override
  void initState() {
    super.initState();
    _loadCart();
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

  // ================= LOAD USER + CART =================
  Future<void> _loadCart() async {
    try {
      final u = await AuthService.getMe().catchError((_) => null);
      if (u == null) {
        if (mounted) {
          Navigator.pushReplacementNamed(context, "/login");
        }
        return;
      }

      final c = await CartService.getCart(u.email);

      if (mounted) {
        setState(() {
          user = u;
          cart = c;
          loading = false;
        });
      }
    } catch (_) {
      if (mounted) setState(() => loading = false);
    }
  }

  // ================= UPDATE QTY =================
  Future<void> updateQty(int productId, int delta) async {
    if (user == null) return;

    await CartService.updateQty(user!.email, productId, delta);
    await _reload();
  }

  // ================= REMOVE ITEM =================
  Future<void> removeItem(int productId) async {
    if (user == null) return;

    await CartService.removeItem(user!.email, productId);
    await _reload();
  }

  // ================= RELOAD =================
  Future<void> _reload() async {
    final c = await CartService.getCart(user!.email);
    if (mounted) setState(() => cart = c);
  }

  // ================= TOTAL =================
  double get total => cart.fold(0, (sum, i) => sum + i.price * i.quantity);

  // ================= UI =================
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // ✅ HEADER
      appBar: PageHeader(
        user: user,
        cartCount: cart.length,
        onLogout: () async {
          await AuthService.logout();
          if (mounted) Navigator.pushReplacementNamed(context, "/");
        },
      ),

      body: loading
          ? const Center(child: CircularProgressIndicator())
          : cart.isEmpty
          ? const Center(child: Text("Giỏ hàng trống"))
          : Column(
              children: [
                Expanded(
                  child: ListView.separated(
                    padding: const EdgeInsets.all(12),
                    itemCount: cart.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 12),
                    itemBuilder: (_, i) {
                      final item = cart[i];

                      return Card(
                        elevation: 3,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: Padding(
                          padding: const EdgeInsets.all(12),
                          child: Row(
                            children: [
                              // IMAGE
                              ClipRRect(
                                borderRadius: BorderRadius.circular(12),
                                child: Image.network(
                                  item.image ?? "",
                                  width: 80,
                                  height: 80,
                                  fit: BoxFit.cover,
                                  errorBuilder: (_, __, ___) =>
                                      const Icon(Icons.image),
                                ),
                              ),
                              const SizedBox(width: 12),

                              // INFO
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      item.name,
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis,
                                      style: const TextStyle(
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                    const SizedBox(height: 6),
                                    Row(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.end,
                                      children: [
                                        Text(
                                          formatPrice(item.price),
                                          style: const TextStyle(
                                            color: Colors.red,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        const SizedBox(width: 2),
                                        const Padding(
                                          padding: EdgeInsets.only(bottom: 2),
                                          child: Text(
                                            "₫",
                                            style: TextStyle(
                                              color: Colors.red,
                                              fontSize: 12,
                                              fontWeight: FontWeight.w600,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),

                                    const SizedBox(height: 8),

                                    // QTY
                                    Row(
                                      children: [
                                        IconButton(
                                          icon: const Icon(Icons.remove),
                                          onPressed: () =>
                                              updateQty(item.id, -1),
                                        ),
                                        Text(
                                          item.quantity.toString(),
                                          style: const TextStyle(
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        IconButton(
                                          icon: const Icon(Icons.add),
                                          onPressed: () =>
                                              updateQty(item.id, 1),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ),

                              // REMOVE
                              IconButton(
                                icon: const Icon(
                                  Icons.delete,
                                  color: Colors.red,
                                ),
                                onPressed: () => removeItem(item.id),
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                ),

                // ================= SUMMARY =================
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: const BoxDecoration(
                    border: Border(top: BorderSide(color: Colors.grey)),
                  ),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text(
                            "Tổng tiền",
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                              Text(
                                formatPrice(total),
                                style: const TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.red,
                                ),
                              ),
                              const SizedBox(width: 3),
                              const Padding(
                                padding: EdgeInsets.only(bottom: 2),
                                child: Text(
                                  "₫",
                                  style: TextStyle(
                                    fontSize: 13,
                                    fontWeight: FontWeight.w600,
                                    color: Colors.red,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),
                      SizedBox(
                        width: double.infinity,
                        height: 48,
                        child: ElevatedButton(
                          onPressed: () {
                            Navigator.pushNamed(context, "/checkout");
                          },
                          child: const Text("Đặt hàng"),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
    );
  }
}
