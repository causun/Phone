import 'package:flutter/material.dart';

import '../../services/auth_service.dart';
import '../../models/user.dart';

import '../home/widgets/page_header.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();

  String email = "";
  String password = "";

  bool loading = false;
  String error = "";

  // ================= SUBMIT LOGIN =================
  Future<void> handleLogin() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      loading = true;
      error = "";
    });

    try {
      final token = await AuthService.login(email, password);

      if (token == null) {
        setState(() => error = "Sai email hoặc mật khẩu");
        return;
      }

      User? user = await AuthService.getMe();
      if (user == null) {
        setState(() => error = "Không lấy được thông tin người dùng");
        return;
      }

      if (mounted) {
        Navigator.pushReplacementNamed(context, "/");
      }
    } catch (_) {
      setState(() => error = "Không thể kết nối server");
    } finally {
      if (mounted) setState(() => loading = false);
    }
  }

  // ================= UI =================
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,

      // ✅ HEADER GẮN Ở ĐÂY
      appBar: PageHeader(
        user: null, // chưa login
        cartCount: 0,
        onLogout: () {}, // không cho logout
      ),

      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Card(
            elevation: 8,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20),
            ),
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Form(
                key: _formKey,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Text(
                      "Welcome Back",
                      style: TextStyle(
                        fontSize: 26,
                        fontWeight: FontWeight.bold,
                        color: Colors.blue,
                      ),
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      "Đăng nhập để tiếp tục",
                      style: TextStyle(color: Colors.grey),
                    ),
                    const SizedBox(height: 24),

                    if (error.isNotEmpty)
                      Container(
                        width: double.infinity,
                        padding: const EdgeInsets.all(12),
                        margin: const EdgeInsets.only(bottom: 12),
                        decoration: BoxDecoration(
                          color: Colors.red.shade50,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          error,
                          style: const TextStyle(color: Colors.red),
                        ),
                      ),

                    // EMAIL
                    TextFormField(
                      decoration: InputDecoration(
                        labelText: "Email",
                        prefixIcon: const Icon(Icons.email),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(16),
                        ),
                      ),
                      keyboardType: TextInputType.emailAddress,
                      onChanged: (v) => email = v,
                      validator: (v) {
                        if (v == null || v.isEmpty) {
                          return "Vui lòng nhập email";
                        }
                        if (!v.contains("@")) {
                          return "Email không hợp lệ";
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 16),

                    // PASSWORD
                    TextFormField(
                      decoration: InputDecoration(
                        labelText: "Password",
                        prefixIcon: const Icon(Icons.lock),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(16),
                        ),
                      ),
                      obscureText: true,
                      onChanged: (v) => password = v,
                      validator: (v) {
                        if (v == null || v.isEmpty) {
                          return "Vui lòng nhập mật khẩu";
                        }
                        if (v.length < 6) {
                          return "Mật khẩu tối thiểu 6 ký tự";
                        }
                        return null;
                      },
                    ),

                    const SizedBox(height: 12),

                    Align(
                      alignment: Alignment.centerRight,
                      child: TextButton(
                        onPressed: () {
                          Navigator.pushNamed(context, "/forgot-password");
                        },
                        child: const Text("Quên mật khẩu?"),
                      ),
                    ),

                    const SizedBox(height: 12),

                    SizedBox(
                      width: double.infinity,
                      height: 48,
                      child: ElevatedButton(
                        onPressed: loading ? null : handleLogin,
                        style: ElevatedButton.styleFrom(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(24),
                          ),
                        ),
                        child: loading
                            ? const SizedBox(
                                width: 24,
                                height: 24,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2,
                                  color: Colors.white,
                                ),
                              )
                            : const Text(
                                "Login",
                                style: TextStyle(fontSize: 16),
                              ),
                      ),
                    ),

                    const SizedBox(height: 20),

                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Text("Chưa có tài khoản? "),
                        TextButton(
                          onPressed: () {
                            Navigator.pushNamed(context, "/register");
                          },
                          child: const Text("Đăng ký"),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
