import 'package:flutter/material.dart';

class ContactPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Liên hệ & Giới thiệu")),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Hero Image
            Container(
              height: 200, width: double.infinity,
              color: Colors.blueAccent,
              child: Center(child: Text("Mobile Store\nKỷ Nguyên Mới", textAlign: TextAlign.center, style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold))),
            ),
            Padding(
              padding: EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text("Hệ thống cửa hàng", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                  ListTile(leading: Icon(Icons.phone), title: Text("1800 1234"), subtitle: Text("Tổng đài miễn phí")),
                  ListTile(leading: Icon(Icons.location_on), title: Text("Quận 1, TP. Hồ Chí Minh"), subtitle: Text("Trụ sở chính")),
                  Divider(),
                  Text("Gửi tin nhắn cho chúng tôi", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                  SizedBox(height: 10),
                  TextField(decoration: InputDecoration(labelText: "Họ và tên", border: OutlineInputBorder())),
                  SizedBox(height: 10),
                  TextField(decoration: InputDecoration(labelText: "Email", border: OutlineInputBorder())),
                  SizedBox(height: 10),
                  TextField(maxLines: 3, decoration: InputDecoration(labelText: "Nội dung thắc mắc", border: OutlineInputBorder())),
                  SizedBox(height: 15),
                  ElevatedButton(onPressed: () {}, child: Text("Gửi yêu cầu hỗ trợ"))
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}