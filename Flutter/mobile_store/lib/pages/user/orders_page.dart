import 'package:flutter/material.dart';

class OrdersPage extends StatelessWidget {
  const OrdersPage({super.key}); // Thêm key theo khuyến nghị analyze

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Đơn hàng của tôi")),
      body: ListView.builder(
        itemCount: 5,
        itemBuilder: (context, index) {
          return ExpansionTile(
            leading: const Icon(Icons.inventory_2_outlined), // Đổi Icons.package thành icon hợp lệ
            title: Text("Mã đơn: #ORD-000$index"),
            subtitle: const Text("Tổng: 15.000.000đ"),
            trailing: Chip(
              label: const Text("Chờ xử lý"), 
              backgroundColor: Colors.orange[100]
            ),
            children: [
              const ListTile(
                title: Text("Địa chỉ nhận hàng"),
                subtitle: Text("123 Đường ABC, Quận 1, TP.HCM"),
              ),
              ListView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(), // Tránh xung đột cuộn
                itemCount: 2,
                itemBuilder: (c, i) => ListTile(
                  title: Text("Sản phẩm $i"), 
                  trailing: const Text("x1")
                ),
              )
            ],
          );
        },
      ),
    );
  }
}