import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'dart:convert';
import 'dart:async';
import 'package:intl/intl.dart';
import '../../api/api_client.dart'; // Giả sử bạn dùng ApiClient đã tạo
import '../../context/cart_provider.dart';

class ProductsPage extends StatefulWidget {
  const ProductsPage({super.key});

  @override
  State<ProductsPage> createState() => _ProductsPageState();
}

class _ProductsPageState extends State<ProductsPage> {
  List<dynamic> products = [];
  List<dynamic> categories = [];
  bool isLoading = true;
  
  String searchTerm = "";
  int? selectedCategoryId;
  Timer? _debounce;

  @override
  void initState() {
    super.initState();
    fetchCategories();
    fetchProducts();
  }

  // Logic gọi API lấy danh mục
  Future<void> fetchCategories() async {
    try {
      final res = await ApiClient.get('/categories');
      if (res.statusCode == 200) {
        setState(() => categories = jsonDecode(res.body));
      }
    } catch (e) {
      print("Lỗi lấy danh mục: $e");
    }
  }

  // Logic gọi API lấy sản phẩm kèm filter (categoryId và name)
  Future<void> fetchProducts() async {
    setState(() => isLoading = true);
    try {
      String url = '/products?';
      if (selectedCategoryId != null) url += 'categoryId=$selectedCategoryId&';
      if (searchTerm.isNotEmpty) url += 'name=$searchTerm&';

      final res = await ApiClient.get(url);
      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);
        setState(() {
          products = data['content'] ?? [];
          isLoading = false;
        });
      }
    } catch (e) {
      setState(() => isLoading = false);
    }
  }

  // Xử lý tìm kiếm Debounce (đợi người dùng gõ xong 500ms mới gọi API)
  _onSearchChanged(String query) {
    if (_debounce?.isActive ?? false) _debounce!.cancel();
    _debounce = Timer(const Duration(milliseconds: 500), () {
      setState(() => searchTerm = query);
      fetchProducts();
    });
  }

  String formatPrice(dynamic price) =>
      NumberFormat.currency(locale: 'vi_VN', symbol: '₫').format(price ?? 0);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF5F5F7), // bg-light như web
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: _buildSearchBox(),
        iconTheme: const IconThemeData(color: Colors.black),
      ),
      body: Column(
        children: [
          _buildCategoryBar(), // Thanh lọc danh mục nằm ngang (phù hợp mobile hơn sidebar)
          Expanded(
            child: isLoading
                ? const Center(child: CircularProgressIndicator())
                : products.isEmpty
                    ? _buildNoResults()
                    : GridView.builder(
                        padding: const EdgeInsets.all(15),
                        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 2,
                          childAspectRatio: 0.65,
                          crossAxisSpacing: 15,
                          mainAxisSpacing: 15,
                        ),
                        itemCount: products.length,
                        itemBuilder: (context, index) => _buildProductCard(products[index]),
                      ),
          ),
        ],
      ),
    );
  }

  // Thanh tìm kiếm (Header Area)
  Widget _buildSearchBox() {
    return Container(
      height: 40,
      decoration: BoxDecoration(
        color: const Color(0xFFF5F5F7),
        borderRadius: BorderRadius.circular(10),
      ),
      child: TextField(
        onChanged: _onSearchChanged,
        decoration: const InputDecoration(
          hintText: "Bạn tìm điện thoại gì...",
          prefixIcon: Icon(Icons.search, size: 20),
          border: InputBorder.none,
          contentPadding: EdgeInsets.symmetric(vertical: 10),
        ),
      ),
    );
  }

  // Filter Category (thay cho sidebar trên web để tối ưu không gian mobile)
  Widget _buildCategoryBar() {
    return Container(
      height: 50,
      color: Colors.white,
      child: ListView(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 10),
        children: [
          _categoryItem(null, "Tất cả"),
          ...categories.map((cat) => _categoryItem(cat['id'], cat['name'])),
        ],
      ),
    );
  }

  Widget _categoryItem(int? id, String name) {
    bool isActive = selectedCategoryId == id;
    return GestureDetector(
      onTap: () {
        setState(() => selectedCategoryId = id);
        fetchProducts();
      },
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 5, vertical: 10),
        padding: const EdgeInsets.symmetric(horizontal: 15),
        decoration: BoxDecoration(
          color: isActive ? Colors.blue : Colors.transparent,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Center(
          child: Text(
            name,
            style: TextStyle(
              color: isActive ? Colors.white : Colors.grey[700],
              fontWeight: isActive ? FontWeight.bold : FontWeight.normal,
            ),
          ),
        ),
      ),
    );
  }

  // Card sản phẩm thiết kế theo Product-Card-Modern của Web
  Widget _buildProductCard(dynamic product) {
    String imageUrl = "http://192.168.43.175:8081/uploads/products/${product['image']}";

    return GestureDetector(
      onTap: () => Navigator.pushNamed(context, '/user/product/${product['id']}'),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 10,
              offset: const Offset(0, 4),
            )
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Badge & Image
            Expanded(
              child: Stack(
                children: [
                  Center(
                    child: Padding(
                      padding: const EdgeInsets.all(15.0),
                      child: Image.network(imageUrl, fit: BoxFit.contain),
                    ),
                  ),
                  PositionImageBadge(),
                ],
              ),
            ),
            // Details
            Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    product['category']?['name'] ?? 'Mobile',
                    style: const TextStyle(color: Colors.grey, fontSize: 10, letterSpacing: 1),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    product['name'] ?? '',
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    formatPrice(product['price']),
                    style: const TextStyle(color: Color(0xFFE30016), fontWeight: FontWeight.bold, fontSize: 16),
                  ),
                  const SizedBox(height: 10),
                  // Button Add to Cart
                  SizedBox(
                    width: double.infinity,
                    height: 35,
                    child: ElevatedButton.icon(
                      onPressed: () {
                        // 'product' ở đây là Map<String, dynamic> lấy từ list API
                        context.read<CartProvider>().addToCart(product, 1);
                        
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text("Đã thêm ${product['name']} vào giỏ!"),
                            duration: const Duration(seconds: 1),
                            backgroundColor: Colors.green,
                          ),
                        );
                      },
                      icon: const Icon(Icons.shopping_cart_outlined, size: 16),
                      label: const Text("Thêm giỏ", style: TextStyle(fontSize: 11)),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.black,
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                      ),
                    ),
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNoResults() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.search_off, size: 80, color: Colors.grey[400]),
          const SizedBox(height: 10),
          const Text("Không tìm thấy sản phẩm nào khớp với từ khóa."),
        ],
      ),
    );
  }
}

// Widget phụ cho Badge "Mới nhất"
class PositionImageBadge extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Positioned(
      top: 10,
      left: 10,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
        decoration: BoxDecoration(
          color: const Color(0xFFF5F5F7),
          borderRadius: BorderRadius.circular(20),
        ),
        child: const Text("Mới nhất", style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold)),
      ),
    );
  }
}