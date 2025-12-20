import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart' as slider;
import 'dart:convert';
import 'package:intl/intl.dart';
import '../../api/api_client.dart';
import '../../components/user_footer.dart';
import '../../components/user_header.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<dynamic> products = [];
  bool isLoading = true;

  final List<Map<String, String>> banners = const [
    {
      "img": "http://192.168.43.175:8081/uploads/banners/b1.JPG",
      "subtitle": "XU THẾ CÔNG NGHỆ 2025",
      "title": "Siêu phẩm\nSmartphone",
    },
    {
      "img": "http://192.168.43.175:8081/uploads/banners/b2.JPG",
      "subtitle": "ƯU ĐÃI ĐẶC BIỆT",
      "title": "Thiết bị chính hãng",
    }
  ];

  @override
  void initState() {
    super.initState();
    fetchProducts();
  }

  Future<void> fetchProducts() async {
    try {
      final response = await ApiClient.get('/products');
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        setState(() {
          List allProducts = data['content'] ?? [];
          products = allProducts.reversed.take(8).toList();
          isLoading = false;
        });
      }
    } catch (e) {
      setState(() => isLoading = false);
    }
  }

  String formatPrice(dynamic price) {
    final formatter = NumberFormat.currency(locale: 'vi_VN', symbol: '₫');
    return formatter.format(price ?? 0);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      // 1. Dùng Header đã thiết kế
      appBar: const UserHeader(),
      
      // 2. Thiết kế Drawer (Menu xổ ra khi bấm 3 gạch)
      drawer: Drawer(
        child: Column(
          children: [
            const UserAccountsDrawerHeader(
              decoration: BoxDecoration(color: Colors.black),
              accountName: Text("Mobile Store", style: TextStyle(fontWeight: FontWeight.bold)),
              accountEmail: Text("Kỷ nguyên công nghệ mới"),
              currentAccountPicture: CircleAvatar(backgroundColor: Colors.blue, child: Text("M", style: TextStyle(color: Colors.white, fontSize: 24))),
            ),
            _buildDrawerItem(Icons.home_outlined, "Trang chủ", '/user/home'),
            _buildDrawerItem(Icons.phone_iphone_outlined, "Sản phẩm", '/user/products'),
            _buildDrawerItem(Icons.newspaper_outlined, "Tin tức", '/user/news'),
            _buildDrawerItem(Icons.contact_support_outlined, "Liên hệ", '/user/contact'),
            const Spacer(),
            const Divider(),
            _buildDrawerItem(Icons.person_outline, "Tài khoản", '/user/profile'),
            const SizedBox(height: 20),
          ],
        ),
      ),

      body: RefreshIndicator(
        onRefresh: fetchProducts,
        child: SingleChildScrollView(
          child: Column(
            children: [
              // --- HERO SLIDER ---
              slider.CarouselSlider(
                options: slider.CarouselOptions(
                  height: 350,
                  autoPlay: true,
                  viewportFraction: 1.0,
                ),
                items: banners.map((item) {
                  return Stack(
                    children: [
                      Image.network(item['img']!, width: double.infinity, height: 350, fit: BoxFit.cover),
                      Container(
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            begin: Alignment.centerLeft,
                            end: Alignment.centerRight,
                            colors: [Colors.black.withOpacity(0.7), Colors.transparent],
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(left: 30.0),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(item['subtitle']!, style: const TextStyle(color: Color(0xFF00D2FF), fontWeight: FontWeight.bold, letterSpacing: 2, fontSize: 12)),
                            const SizedBox(height: 10),
                            Text(item['title']!, style: const TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.w900, height: 1.1)),
                          ],
                        ),
                      ),
                    ],
                  );
                }).toList(),
              ),

              // --- GRID SẢN PHẨM ---
              Padding(
                padding: const EdgeInsets.all(20.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text("✨ Sản phẩm mới về", style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
                    TextButton(
                      onPressed: () {
                        Navigator.pushNamed(context, '/user/products'); // THÊM DÒNG NÀY
                      }, 
                      child: const Text("Xem tất cả")
                    ),
                  ],
                ),
              ),

              isLoading
                  ? const Center(child: CircularProgressIndicator())
                  : GridView.builder(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      padding: const EdgeInsets.symmetric(horizontal: 20),
                      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                        childAspectRatio: 0.6,
                        crossAxisSpacing: 15,
                        mainAxisSpacing: 15,
                      ),
                      itemCount: products.length,
                      itemBuilder: (context, index) => _buildProductCard(products[index]),
                    ),

              const SizedBox(height: 40),
              
              // 3. Dùng Footer đã thiết kế
              const UserFooter(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDrawerItem(IconData icon, String title, String route) {
    return ListTile(
      leading: Icon(icon, color: Colors.black87),
      title: Text(title, style: const TextStyle(fontWeight: FontWeight.w600)),
      onTap: () {
        Navigator.pop(context); // Đóng drawer
        Navigator.pushNamed(context, route);
      },
    );
  }

  Widget _buildProductCard(dynamic product) {
    String imageUrl = "http://192.168.43.175:8081/uploads/products/${product['image'] ?? ''}";
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFF0F0F0)),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10, offset: const Offset(0, 5))],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: Container(
              padding: const EdgeInsets.all(15),
              child: Image.network(imageUrl, fit: BoxFit.contain, errorBuilder: (c, e, s) => const Icon(Icons.image_not_supported)),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(10),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(product['name'] ?? '', maxLines: 2, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                const SizedBox(height: 5),
                Text(formatPrice(product['price']), style: const TextStyle(color: Color(0xFFD70018), fontWeight: FontWeight.w800)),
                const SizedBox(height: 10),
                SizedBox(
                  width: double.infinity,
                  height: 35,
                  child: ElevatedButton(
                    onPressed: () {},
                    style: ElevatedButton.styleFrom(backgroundColor: Colors.black, foregroundColor: Colors.white),
                    child: const Text("Thêm giỏ", style: TextStyle(fontSize: 11)),
                  ),
                )
              ],
            ),
          )
        ],
      ),
    );
  }
}