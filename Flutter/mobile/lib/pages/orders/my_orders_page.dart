import 'package:flutter/material.dart';

import '../../services/order_service.dart';
import '../../services/auth_service.dart';

import '../../models/order.dart';
import '../../models/user.dart';

import '../home/widgets/page_header.dart';
import 'order_detail_page.dart';

class MyOrdersPage extends StatefulWidget {
  const MyOrdersPage({super.key});

  @override
  State<MyOrdersPage> createState() => _MyOrdersPageState();
}

class _MyOrdersPageState extends State<MyOrdersPage> {
  late Future<List<Order>> _future;
  User? user;

  @override
  void initState() {
    super.initState();
    _future = OrderService.myOrders();
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

      body: FutureBuilder<List<Order>>(
        future: _future,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          if (snapshot.hasError) {
            return const Center(child: Text("Lỗi tải đơn hàng"));
          }

          final orders = snapshot.data ?? [];

          if (orders.isEmpty) {
            return const Center(child: Text("Bạn chưa có đơn hàng nào"));
          }

          return ListView.builder(
            padding: const EdgeInsets.all(12),
            itemCount: orders.length,
            itemBuilder: (context, index) {
              final o = orders[index];

              return Card(
                margin: const EdgeInsets.only(bottom: 12),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                child: ListTile(
                  title: Text("Đơn #${o.id}"),
                  subtitle: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("Trạng thái: ${o.statusText}"),
                      const SizedBox(height: 4),
                      Text(
                        "Tổng tiền: ${o.totalPrice.toStringAsFixed(0)} ₫",
                        style: const TextStyle(fontWeight: FontWeight.w600),
                      ),
                    ],
                  ),
                  trailing: const Icon(Icons.chevron_right),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => OrderDetailPage(orderId: o.id),
                      ),
                    );
                  },
                ),
              );
            },
          );
        },
      ),
    );
  }
}
