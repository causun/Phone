// import 'package:flutter/material.dart';
// import 'package:provider/provider.dart';
// import '../../context/cart_provider.dart';
// import 'package:intl/intl.dart';

// class CartPage extends StatelessWidget {
//   const CartPage({super.key});

//   @override
//   Widget build(BuildContext context) {
//     final cartProvider = Provider.of<CartProvider>(context);
//     final currencyFormat = NumberFormat.currency(locale: 'vi_VN', symbol: '₫');

//     // SỬA LỖI: Truy cập Map bằng item['key']
//     double subtotal = cartProvider.cartItems.fold(0, (sum, item) {
//       final price = (item['price'] ?? 0).toDouble();
//       final qty = (item['quantity'] ?? 1) as int;
//       return sum + (price * qty);
//     });
    
//     double shipping = subtotal > 1000000 ? 0 : 30000;
//     double total = subtotal + shipping;

//     return Scaffold(
//       appBar: AppBar(title: Text("Giỏ hàng của bạn (${cartProvider.cartItems.length})")),
//       body: cartProvider.cartItems.isEmpty
//           ? const Center(child: Text("Giỏ hàng trống"))
//           : ListView.builder(
//               itemCount: cartProvider.cartItems.length,
//               itemBuilder: (context, index) {
//                 final item = cartProvider.cartItems[index];
//                 return Card(
//                   margin: const EdgeInsets.all(8),
//                   child: ListTile(
//                     leading: Image.network("http://10.0.2.2:8081/uploads/products/${item['image']}", width: 60),
//                     title: Text(item['name'] ?? ""),
//                     subtitle: Text(currencyFormat.format(item['price'] ?? 0)),
//                     trailing: Row(
//                       mainAxisSize: MainAxisSize.min,
//                       children: [
//                         IconButton(
//                           icon: const Icon(Icons.remove), 
//                           onPressed: () => cartProvider.updateQty(item['id'], item['quantity'] - 1)
//                         ),
//                         Text("${item['quantity']}"),
//                         IconButton(
//                           icon: const Icon(Icons.add), 
//                           onPressed: () => cartProvider.updateQty(item['id'], item['quantity'] + 1)
//                         ),
//                         IconButton(
//                           icon: const Icon(Icons.delete, color: Colors.red), 
//                           onPressed: () => cartProvider.removeFromCart(item['id'])
//                         ),
//                       ],
//                     ),
//                   ),
//                 );
//               },
//             ),
//       bottomNavigationBar: Container(
//         padding: const EdgeInsets.all(16),
//         height: 180,
//         decoration: const BoxDecoration(
//           color: Colors.white, 
//           boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 10)]
//         ),
//         child: Column(
//           children: [
//             Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [const Text("Tạm tính:"), Text(currencyFormat.format(subtotal))]),
//             Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [const Text("Phí ship:"), Text(currencyFormat.format(shipping))]),
//             const Divider(),
//             Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
//               const Text("Tổng cộng:", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
//               Text(currencyFormat.format(total), style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: Colors.blue)),
//             ]),
//             const SizedBox(height: 10),
//             ElevatedButton(
//               style: ElevatedButton.styleFrom(
//                 minimumSize: const Size(double.infinity, 50), 
//                 backgroundColor: Colors.blue,
//                 foregroundColor: Colors.white
//               ),
//               onPressed: () => Navigator.pushNamed(context, '/user/checkout'),
//               child: const Text("THANH TOÁN (COD)"),
//             )
//           ],
//         ),
//       ),
//     );
//   }
// }