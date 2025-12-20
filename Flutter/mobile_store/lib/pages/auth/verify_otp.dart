import 'dart:async';
import 'package:flutter/material.dart';
import '../../api/api_client.dart';

class VerifyOtpPage extends StatefulWidget {
  final String email;
  const VerifyOtpPage({super.key, required this.email});

  @override
  State<VerifyOtpPage> createState() => _VerifyOtpPageState();
}

class _VerifyOtpPageState extends State<VerifyOtpPage> {
  final otpController = TextEditingController();
  int countdown = 60;
  Timer? timer;

  @override
  void initState() {
    super.initState();
    startTimer();
  }

  void startTimer() {
    timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (countdown > 0) {
        setState(() => countdown--);
      } else {
        t.cancel();
      }
    });
  }

  void handleVerify() async {
    final res = await ApiClient.post('/auth/verify-otp', {
      'email': widget.email,
      'otp': otpController.text,
    });
    // Xử lý logic giống React: Nếu thành công thì về login
    Navigator.pushNamed(context, '/login');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Xác thực OTP")),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [
            Text("Mã xác thực đã gửi tới: ${widget.email}"),
            TextField(controller: otpController, decoration: const InputDecoration(hintText: "Nhập OTP")),
            ElevatedButton(onPressed: handleVerify, child: const Text("Xác thực")),
            const SizedBox(height: 20),
            countdown > 0 
              ? Text("Gửi lại mã sau ${countdown}s")
              : TextButton(onPressed: () { /* Logic resend */ }, child: const Text("Gửi lại mã OTP")),
          ],
        ),
      ),
    );
  }
  
  @override
  void dispose() {
    timer?.cancel();
    super.dispose();
  }
}