import 'package:flutter/material.dart';

import '../../models/cart_item.dart';
import '../../models/user.dart';

import '../../services/auth_service.dart';
import '../../services/cart_service.dart';
import '../../services/order_service.dart';

import '../home/widgets/page_header.dart';

class CheckoutPage extends StatefulWidget {
  const CheckoutPage({super.key});

  @override
  State<CheckoutPage> createState() => _CheckoutPageState();
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

class _CheckoutPageState extends State<CheckoutPage> {
  User? user;
  List<CartItem> cart = [];
  bool loading = true;
  bool submitting = false;

  final _formKey = GlobalKey<FormState>();

  String fullName = "";
  String phone = "";
  String address = "";
  String note = "";

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  // ================= LOAD USER + CART =================
  Future<void> _loadData() async {
    final u = await AuthService.getMe().catchError((_) => null);
    if (u == null) {
      if (mounted) Navigator.pushReplacementNamed(context, "/login");
      return;
    }

    final c = await CartService.getCart(u.email);

    if (mounted) {
      setState(() {
        user = u;
        cart = c;
        fullName = u.fullName;
        phone = u.phone ?? "";
        address = u.address ?? "";
        loading = false;
      });
    }
  }

  // ================= TOTAL =================
  double get total => cart.fold(0, (sum, i) => sum + i.price * i.quantity);

  // ================= SUBMIT ORDER =================
  Future<void> submitOrder() async {
    if (!_formKey.currentState!.validate()) return;
    if (cart.isEmpty) return;

    setState(() => submitting = true);

    try {
      await OrderService.placeOrder(
        fullName: fullName,
        phone: phone,
        address: address,
        note: note,
        items: cart,
      );

      await CartService.clear(user!.email);

      if (mounted) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(const SnackBar(content: Text("Đặt hàng thành công 🎉")));
        Navigator.pushNamedAndRemoveUntil(context, "/", (route) => false);
      }
    } catch (_) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text("Đặt hàng thất bại ❌")));
    } finally {
      if (mounted) setState(() => submitting = false);
    }
  }

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
          : Column(
              children: [
                Expanded(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.all(16),
                    child: Form(
                      key: _formKey,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // ================= SHIPPING INFO =================
                          const Text(
                            "Thông tin giao hàng",
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 12),

                          TextFormField(
                            initialValue: fullName,
                            decoration: const InputDecoration(
                              labelText: "Họ tên",
                              border: OutlineInputBorder(),
                            ),
                            onChanged: (v) => fullName = v,
                            validator: (v) => v == null || v.isEmpty
                                ? "Không được để trống"
                                : null,
                          ),
                          const SizedBox(height: 12),

                          TextFormField(
                            initialValue: phone,
                            decoration: const InputDecoration(
                              labelText: "Số điện thoại",
                              border: OutlineInputBorder(),
                            ),
                            keyboardType: TextInputType.phone,
                            onChanged: (v) => phone = v,
                            validator: (v) => v == null || v.isEmpty
                                ? "Không được để trống"
                                : null,
                          ),
                          const SizedBox(height: 12),

                          TextFormField(
                            initialValue: address,
                            decoration: const InputDecoration(
                              labelText: "Địa chỉ",
                              border: OutlineInputBorder(),
                            ),
                            onChanged: (v) => address = v,
                            validator: (v) => v == null || v.isEmpty
                                ? "Không được để trống"
                                : null,
                          ),
                          const SizedBox(height: 12),
                          const Text(
                            "Đơn hàng của bạn",
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 12),

                          ...cart.map(
                            (i) => Padding(
                              padding: const EdgeInsets.symmetric(vertical: 6),
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Expanded(
                                    child: Text(
                                      "${i.name} x${i.quantity}",
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ),
                                  Row(
                                    crossAxisAlignment: CrossAxisAlignment.end,
                                    children: [
                                      Text(
                                        formatPrice(i.price * i.quantity),
                                        style: const TextStyle(
                                          fontWeight: FontWeight.w600,
                                        ),
                                      ),
                                      const SizedBox(width: 2),
                                      const Text(
                                        "₫",
                                        style: TextStyle(fontSize: 12),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),

                // ================= TOTAL =================
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
                          onPressed: submitting ? null : submitOrder,
                          child: submitting
                              ? const CircularProgressIndicator(
                                  color: Colors.white,
                                )
                              : const Text("Đặt hàng"),
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
