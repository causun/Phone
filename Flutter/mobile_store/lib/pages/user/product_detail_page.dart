// import 'package:flutter/material.dart';
// import 'package:flutter_widget_from_html/flutter_widget_from_html.dart';
// import 'package:intl/intl.dart';
// import 'package:http/http.dart' as http;
// import 'dart:convert';

// import '../../context/cart_provider.dart';
// import 'package:provider/provider.dart';

// class ProductDetailPage extends StatefulWidget {
//   final int productId;
//   const ProductDetailPage({super.key, required this.productId});

//   @override
//   State<ProductDetailPage> createState() => _ProductDetailPageState();
// }

// class _ProductDetailPageState extends State<ProductDetailPage> {
//   Map<String, dynamic>? product;
//   bool isWishlist = false;
//   final String baseUrl = "http://localhost:8081/uploads/products/";

//   @override
//   void initState() {
//     super.initState();
//     fetchProduct();
//   }

//   fetchProduct() async {
//     try {
//       final res = await http.get(Uri.parse('http://192.168.1.138:8081/api/products/${widget.productId}'));
//       if (res.statusCode == 200) {
//         setState(() {
//           // QUAN TRỌNG: Sửa res.data thành res.body
//           product = json.decode(res.body)['data']; 
//         });
//       }
//     } catch (e) {
//       print("Lỗi fetch: $e");
//     }
//   }

//   String formatPrice(dynamic price) {
//     return NumberFormat.currency(locale: 'vi_VN', symbol: '₫').format(price ?? 0);
//   }

//   @override
//   Widget build(BuildContext context) {
//     if (product == null) return const Scaffold(body: Center(child: CircularProgressIndicator()));

//     return Scaffold(
//       appBar: AppBar(
//         leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => Navigator.pop(context)),
//         title: Text(product!['name'], style: const TextStyle(fontSize: 18)),
//       ),
//       body: SingleChildScrollView(
//         child: Column(
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//             // Ảnh sản phẩm
//             Container(
//               height: 300,
//               width: double.infinity,
//               color: Colors.white,
//               child: Image.network("$baseUrl${product!['image']}", fit: BoxFit.contain),
//             ),
            
//             Padding(
//               padding: const EdgeInsets.all(16.0),
//               child: Column(
//                 crossAxisAlignment: CrossAxisAlignment.start,
//                 children: [
//                   Row(
//                     mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                     children: [
//                       Container(
//                         padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
//                         decoration: BoxDecoration(color: Colors.blue[50], borderRadius: BorderRadius.circular(4)),
//                         child: Text(product!['category']?['name'] ?? "Điện thoại", style: TextStyle(color: Colors.blue[700])),
//                       ),
//                       IconButton(
//                         icon: Icon(isWishlist ? Icons.favorite : Icons.favorite_border, color: Colors.red),
//                         onPressed: () => setState(() => isWishlist = !isWishlist),
//                       )
//                     ],
//                   ),
//                   const SizedBox(height: 10),
//                   Text(product!['name'], style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
//                   const SizedBox(height: 10),
//                   Text(formatPrice(product!['price']), style: const TextStyle(fontSize: 20, color: Colors.red, fontWeight: FontWeight.bold)),
//                   const SizedBox(height: 20),
                  
//                   // Chính sách
//                   _buildPolicyItem(Icons.local_shipping, "Giao hàng miễn phí toàn quốc"),
//                   _buildPolicyItem(Icons.verified_user, "Bảo hành chính hãng 12 tháng"),
//                   _buildPolicyItem(Icons.refresh, "Lỗi là đổi mới trong 30 ngày"),
                  
//                   const SizedBox(height: 30),
//                   const Text("Mô tả sản phẩm", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
//                   const Divider(),
//                   HtmlWidget(
//                     product!['description'] ?? "",
//                     textStyle: const TextStyle(fontSize: 14),
//                   )
//                 ],
//               ),
//             ),
//           ],
//         ),
//       ),
//       bottomNavigationBar: Container(
//         padding: const EdgeInsets.all(16),
//         child: ElevatedButton.icon(
//           onPressed: (product!['stock'] > 0) ? () {
//             context.read<CartProvider>().add(product); // Gọi Provider
//             ScaffoldMessenger.of(context).showSnackBar(
//               const SnackBar(content: Text("Đã thêm vào giỏ hàng!"))
//             );
//           } : null,
          
//           icon: const Icon(Icons.shopping_cart),
//           label: Text(product!['stock'] > 0 ? "THÊM VÀO GIỎ HÀNG" : "HẾT HÀNG"),
//           style: ElevatedButton.styleFrom(
//             backgroundColor: Colors.blue[800],
//             foregroundColor: Colors.white,
//             padding: const EdgeInsets.symmetric(vertical: 15),
//           ),
//         ),
//       ),
//     );
//   }

//   Widget _buildPolicyItem(IconData icon, String text) {
//     return Padding(
//       padding: const EdgeInsets.symmetric(vertical: 4),
//       child: Row(
//         children: [
//           Icon(icon, size: 18, color: Colors.green),
//           const SizedBox(width: 10),
//           Text(text),
//         ],
//       ),
//     );
//   }
// }