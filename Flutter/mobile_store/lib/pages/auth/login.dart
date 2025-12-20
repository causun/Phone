import 'package:flutter/material.dart';
import '../../api/api_client.dart';
import '../../components/my_input.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  bool isLoading = false;

void handleLogin() async {
    if (emailController.text.isEmpty || passwordController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text("Vui lòng nhập đầy đủ")));
      return;
    }

    setState(() => isLoading = true);
    try {
      final response = await ApiClient.post('/auth/login', {
        'email': emailController.text.trim().toLowerCase(),
        'password': passwordController.text,
      });

      // Kiểm tra xem widget còn tồn tại không trước khi dùng context
      if (!mounted) return;

      final resData = jsonDecode(response.body);
      
      if (response.statusCode == 200 && resData['success'] == true) {
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('user', jsonEncode(resData['data']));

        String role = resData['data']['role'];
        
        // Dùng mounted một lần nữa cho an toàn
        if (!mounted) return;
        
        if (role == "ADMIN") {
          Navigator.pushReplacementNamed(context, '/admin/dashboard');
        } else {
          Navigator.pushReplacementNamed(context, '/user/home');
        }
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(resData['message'] ?? "Sai tài khoản hoặc mật khẩu"))
        );
      }
    } catch (e) {
      if (!mounted) return;
      // In lỗi ra để bạn dễ debug trong Debug Console
      print("Lỗi Login: $e"); 
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Lỗi kết nối đến Server"))
      );
    } finally {
      if (mounted) setState(() => isLoading = false);
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text("LOGIN", style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            MyInput(hintText: "Email", controller: emailController, keyboardType: TextInputType.emailAddress),
            MyInput(hintText: "Password", controller: passwordController, obscureText: true),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: isLoading ? null : handleLogin,
              style: ElevatedButton.styleFrom(minimumSize: const Size(double.infinity, 50)),
              child: Text(isLoading ? "Đang xử lý..." : "Login"),
            ),
            TextButton(onPressed: () => Navigator.pushNamed(context, '/register'), child: const Text("Don't have account? Register")),
            TextButton(onPressed: () => Navigator.pushNamed(context, '/forgot-password'), child: const Text("Forgot password? Recover")),
          ],
        ),
      ),
    );
  }
}