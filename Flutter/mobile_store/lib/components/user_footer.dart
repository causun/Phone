import 'package:flutter/material.dart';

class UserFooter extends StatelessWidget {
  const UserFooter({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: const Color(0xFF1A1A1A),
      width: double.infinity,
      child: Column(
        children: [
          // 1. Trust Bar (Giống Trust Bar trên Web)
          Container(
            padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 15),
            color: const Color(0xFF262626),
            child: Column(
              children: [
                _buildTrustItem(Icons.shield_outlined, "Chất lượng thật", "Sản phẩm chính hãng 100%"),
                const SizedBox(height: 15),
                _buildTrustItem(Icons.local_shipping_outlined, "Giao hàng nhanh", "Hỏa tốc 2h nội thành"),
                const SizedBox(height: 15),
                _buildTrustItem(Icons.replay_outlined, "Đổi trả dễ dàng", "Lỗi 1 đổi 1 trong 45 ngày"),
              ],
            ),
          ),
          
          // 2. Main Footer Content
          Padding(
            padding: const EdgeInsets.all(25),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  "MOBILE STORE",
                  style: TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.w900, letterSpacing: 1),
                ),
                const SizedBox(height: 10),
                const Text(
                  "Kỷ nguyên công nghệ mới - Thành lập từ 2019, giải pháp công nghệ đỉnh cao cho mọi khách hàng.",
                  style: TextStyle(color: Color(0xFF9CA3AF), fontSize: 14, height: 1.5),
                ),
                const SizedBox(height: 25),
                _buildContactItem(Icons.phone_in_talk, "Mua hàng:", "1800 1234"),
                _buildContactItem(Icons.email_outlined, "Email:", "mobilestore2025pr4@gmail.com"),
                _buildContactItem(Icons.location_on_outlined, "Trụ sở:", "Quận 1, TP. Hồ Chí Minh"),
                
                const Divider(color: Color(0xFF333333), height: 40),
                
                const Center(
                  child: Text(
                    "© 2019 - 2025 Mobile Store. All rights reserved.",
                    style: TextStyle(color: Color(0xFF6B7280), fontSize: 12),
                  ),
                ),
                const SizedBox(height: 10),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTrustItem(IconData icon, String title, String sub) {
    return Row(
      children: [
        Icon(icon, color: Colors.blue, size: 30),
        const SizedBox(width: 15),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),
            Text(sub, style: const TextStyle(color: Colors.grey, fontSize: 12)),
          ],
        )
      ],
    );
  }

  Widget _buildContactItem(IconData icon, String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        children: [
          Icon(icon, color: Colors.blue, size: 20),
          const SizedBox(width: 12),
          RichText(
            text: TextSpan(
              children: [
                TextSpan(text: "$label ", style: const TextStyle(color: Color(0xFF9CA3AF), fontSize: 14)),
                TextSpan(text: value, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}