import 'package:flutter/material.dart';

import '../../models/product.dart';
import '../../models/review.dart';
import '../../models/user.dart';
import '../../models/cart_item.dart';

import '../../services/product_service.dart';
import '../../services/review_service.dart';
import '../../services/auth_service.dart';
import '../../services/cart_service.dart';

import '../home/widgets/page_header.dart';

class ProductDetailPage extends StatefulWidget {
  final int id;
  const ProductDetailPage({super.key, required this.id});

  @override
  State<ProductDetailPage> createState() => _ProductDetailPageState();
}

class _ProductDetailPageState extends State<ProductDetailPage> {
  Product? product;
  User? user;
  List<Review> reviews = [];

  bool loading = true;

  int starFilter = 0;
  bool hasCommentOnly = false;
  String sortType = "newest";

  @override
  void initState() {
    super.initState();
    _loadData();
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

  // ================= LOAD DATA =================
  Future<void> _loadData() async {
    try {
      final results = await Future.wait([
        ProductService.getById(widget.id),
        ReviewService.getByProduct(widget.id),
        AuthService.getMe().catchError((_) => null),
      ]);

      if (!mounted) return;

      setState(() {
        product = results[0] as Product?;
        reviews = results[1] as List<Review>;
        user = results[2] as User?;
        loading = false;
      });
    } catch (_) {
      if (mounted) setState(() => loading = false);
    }
  }

  // ================= BUILD =================
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PageHeader(
        user: user,
        cartCount: 0,
        onLogout: () async {
          await AuthService.logout();
          if (mounted) Navigator.pushReplacementNamed(context, "/");
        },
      ),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : product == null
          ? const Center(child: Text("Không tìm thấy sản phẩm"))
          : SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  _buildMainCard(),
                  const SizedBox(height: 24),
                  _buildSpecs(),
                  const SizedBox(height: 24),
                  _buildDescription(),
                  const SizedBox(height: 24),

                  // ⛔ GIỮ NGUYÊN PHẦN ĐÁNH GIÁ
                  _buildReviews(),
                ],
              ),
            ),
    );
  }

  // ================= MAIN CARD =================
  Widget _buildMainCard() {
    return Container(
      decoration: _card(),
      padding: const EdgeInsets.all(20),
      child: Column(
        children: [
          SizedBox(
            height: 260,
            child: PageView.builder(
              itemCount: product!.imageUrls.length,
              itemBuilder: (_, i) =>
                  Image.network(product!.imageUrls[i], fit: BoxFit.contain),
            ),
          ),
          const SizedBox(height: 16),
          Text(
            product!.name,
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 6),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                formatPrice(product!.price),
                style: const TextStyle(
                  fontSize: 26,
                  fontWeight: FontWeight.w900,
                  color: Color(0xff2563eb),
                ),
              ),
              const SizedBox(width: 4),
              const Padding(
                padding: EdgeInsets.only(bottom: 3),
                child: Text(
                  "₫",
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                    color: Color(0xff2563eb),
                  ),
                ),
              ),
            ],
          ),

          const SizedBox(height: 10),
          _stars(avgRating),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: ElevatedButton(
                  onPressed: product!.quantityInStock == 0 ? null : _buyNow,
                  child: const Text("Mua ngay"),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: OutlinedButton(
                  onPressed: product!.quantityInStock == 0 ? null : _addToCart,
                  child: const Text("Thêm giỏ"),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  // ================= SPECS =================
  Widget _buildSpecs() {
    return Container(
      decoration: _card(),
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "Thông số kỹ thuật",
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 12),
          _spec("Màn hình", product!.screenSize),
          _spec("RAM", product!.ram),
          _spec("Bộ nhớ", product!.storage),
          _spec("Chip", product!.chipset),
          _spec("Camera", product!.camera),
          _spec("Pin", product!.battery),
          _spec("Hệ điều hành", product!.os),
          _spec("Màu sắc", product!.color),
        ],
      ),
    );
  }

  Widget _spec(String label, String? value) {
    if (value == null || value.isEmpty) return const SizedBox();
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        children: [
          SizedBox(
            width: 110,
            child: Text(
              label,
              style: const TextStyle(fontWeight: FontWeight.w600),
            ),
          ),
          Expanded(child: Text(value)),
        ],
      ),
    );
  }

  // ================= DESCRIPTION =================
  Widget _buildDescription() {
    return Container(
      decoration: _card(),
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "Mô tả sản phẩm",
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 8),
          Text(product!.description ?? ""),
        ],
      ),
    );
  }

  // ================= REVIEWS (GIỮ NGUYÊN CODE CỦA BẠN) =================
  Widget _buildReviews() {
    return Container(
      decoration: _card(),
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "Đánh giá sản phẩm",
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 12),

          Wrap(
            spacing: 8,
            children: [
              _filterBtn("Tất cả", 0),
              for (int i = 5; i >= 1; i--) _filterBtn("$i sao", i),
              FilterChip(
                label: const Text("Có bình luận"),
                selected: hasCommentOnly,
                onSelected: (v) => setState(() => hasCommentOnly = v),
              ),
            ],
          ),
          const SizedBox(height: 16),

          if (filteredReviews.isEmpty) const Text("Chưa có đánh giá phù hợp"),

          for (final r in filteredReviews) _reviewItem(r),
        ],
      ),
    );
  }

  // ================= REVIEW HELPERS (GIỮ NGUYÊN) =================
  double get avgRating {
    if (reviews.isEmpty) return 0;
    final sum = reviews.fold<int>(0, (s, r) => s + r.rating);
    return sum / reviews.length;
  }

  List<Review> get filteredReviews {
    List<Review> list = [...reviews];

    if (starFilter > 0) {
      list = list.where((r) => r.rating == starFilter).toList();
    }

    if (hasCommentOnly) {
      list = list.where((r) => r.comment?.isNotEmpty ?? false).toList();
    }

    list.sort((a, b) {
      switch (sortType) {
        case "newest":
          return b.createdAt.compareTo(a.createdAt);
        case "oldest":
          return a.createdAt.compareTo(b.createdAt);
        case "highest":
          return b.rating.compareTo(a.rating);
        case "lowest":
          return a.rating.compareTo(b.rating);
        default:
          return 0;
      }
    });

    return list;
  }

  Widget _filterBtn(String text, int star) {
    return ChoiceChip(
      label: Text(text),
      selected: starFilter == star,
      onSelected: (_) => setState(() => starFilter = star),
    );
  }

  Widget _reviewItem(Review r) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            r.userName ?? "User",
            style: const TextStyle(fontWeight: FontWeight.bold),
          ),
          _stars(r.rating.toDouble()),
          if (r.comment?.isNotEmpty ?? false) Text(r.comment!),
        ],
      ),
    );
  }

  // ================= COMMON =================
  Widget _stars(double rating) {
    final full = rating.floor();
    return Text(
      "⭐" * full + "☆" * (5 - full),
      style: const TextStyle(color: Colors.amber),
    );
  }

  BoxDecoration _card() => BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(20),
    boxShadow: const [
      BoxShadow(
        color: Color.fromRGBO(0, 0, 0, .08),
        blurRadius: 20,
        offset: Offset(0, 10),
      ),
    ],
  );

  Future<void> _addToCart() async {
    if (user == null) {
      Navigator.pushNamed(context, "/login");
      return;
    }
    await CartService.addItem(
      user!.email,
      CartItem(
        id: product!.id,
        name: product!.name,
        price: product!.price,
        quantity: 1,
        image: product!.imageUrls.first,
      ),
    );
    _toast("Đã thêm vào giỏ hàng 🛒");
  }

  Future<void> _buyNow() async {
    await _addToCart();
    if (mounted) Navigator.pushNamed(context, "/cart");
  }

  void _toast(String msg) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg)));
  }
}
