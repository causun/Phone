import 'package:flutter/material.dart';

import '../../models/order.dart';
import '../../models/user.dart';

import '../../services/order_service.dart';
import '../../services/auth_service.dart';

import '../home/widgets/page_header.dart';

class OrderDetailPage extends StatefulWidget {
  final int orderId;

  const OrderDetailPage({super.key, required this.orderId});

  @override
  State<OrderDetailPage> createState() => _OrderDetailPageState();
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

class _OrderDetailPageState extends State<OrderDetailPage> {
  late Future<Order> _future;
  User? user;

  @override
  void initState() {
    super.initState();
    _future = OrderService.getDetail(widget.orderId);
    _loadUser();
  }

  Future<void> _loadUser() async {
    final u = await AuthService.getMe().catchError((_) => null);
    if (mounted) setState(() => user = u);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // ✅ HEADER
      appBar: PageHeader(
        user: user,
        cartCount: 0,
        onLogout: () async {
          await AuthService.logout();
          if (mounted) Navigator.pushReplacementNamed(context, "/");
        },
      ),

      body: FutureBuilder<Order>(
        future: _future,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          if (!snapshot.hasData) {
            return const Center(child: Text("Không tìm thấy đơn hàng"));
          }

          final order = snapshot.data!;

          return ListView(
            padding: const EdgeInsets.all(16),
            children: [
              _infoBox(order),
              const SizedBox(height: 16),
              _itemsBox(order),
              const SizedBox(height: 16),
              _totalBox(order),
            ],
          );
        },
      ),
    );
  }

  // ================= INFO =================
  Widget _infoBox(Order o) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Đơn #${o.id}",
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Text("Trạng thái: ${o.statusText}"),
            Text("Người nhận: ${o.fullName}"),
            Text("SĐT: ${o.phone}"),
            Text("Địa chỉ: ${o.address}"),
          ],
        ),
      ),
    );
  }

  // ================= ITEMS =================
  Widget _itemsBox(Order o) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Column(
        children: [
          const Padding(
            padding: EdgeInsets.all(12),
            child: Text(
              "Sản phẩm",
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
          ),
          ...o.items.map(
            (i) => ListTile(
              leading: Image.network(
                i.imageUrl ?? "",
                width: 56,
                errorBuilder: (_, __, ___) => const Icon(Icons.image, size: 40),
              ),
              title: Text(i.productName),
              subtitle: Text("Số lượng: ${i.quantity}"),
              trailing: Row(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    formatPrice(i.price),
                    style: const TextStyle(fontWeight: FontWeight.w600),
                  ),
                  const SizedBox(width: 2),
                  const Text("₫", style: TextStyle(fontSize: 12)),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  // ================= TOTAL =================
  Widget _totalBox(Order o) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text("Tổng thanh toán", style: TextStyle(fontSize: 16)),
            Text(
              "${o.totalPrice.toStringAsFixed(0)} ₫",
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Colors.red,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
