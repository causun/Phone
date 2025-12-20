import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../context/cart_provider.dart';

class CheckoutPage extends StatefulWidget {
  @override
  _CheckoutPageState createState() => _CheckoutPageState();
}

class _CheckoutPageState extends State<CheckoutPage> {
  final _formKey = GlobalKey<FormState>();
  String fullName = "", phone = "", province = "", district = "", ward = "", detail = "";

  @override
  Widget build(BuildContext context) {
    final cart = Provider.of<CartProvider>(context);

    return Scaffold(
      appBar: AppBar(title: Text("Thanh toán")),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text("Thông tin nhận hàng", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              SizedBox(height: 15),
              TextFormField(decoration: InputDecoration(labelText: "Họ tên", border: OutlineInputBorder()), onChanged: (v) => fullName = v),
              SizedBox(height: 10),
              TextFormField(decoration: InputDecoration(labelText: "Số điện thoại", border: OutlineInputBorder()), onChanged: (v) => phone = v),
              SizedBox(height: 10),
              // Ở đây có thể dùng Dropdown cho Tỉnh/Huyện/Xã
              TextFormField(decoration: InputDecoration(labelText: "Địa chỉ chi tiết", border: OutlineInputBorder()), onChanged: (v) => detail = v),
              SizedBox(height: 20),
              Text("Phương thức thanh toán", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              ListTile(
                leading: Icon(Icons.money),
                title: Text("Thanh toán khi nhận hàng (COD)"),
                trailing: Icon(Icons.check_circle, color: Colors.green),
              ),
              SizedBox(height: 30),
              ElevatedButton(
                style: ElevatedButton.styleFrom(minimumSize: Size(double.infinity, 55), backgroundColor: Colors.green),
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    // Logic gọi API đặt hàng tương tự React
                    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Đặt hàng thành công!")));
                    cart.clearCart();
                    Navigator.pushReplacementNamed(context, '/user/home');
                  }
                },
                child: Text("XÁC NHẬN ĐẶT HÀNG", style: TextStyle(fontSize: 16, color: Colors.white)),
              )
            ],
          ),
        ),
      ),
    );
  }
}