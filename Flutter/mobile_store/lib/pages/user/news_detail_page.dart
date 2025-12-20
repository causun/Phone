import 'package:flutter/material.dart';
import 'package:flutter_widget_from_html/flutter_widget_from_html.dart';
import 'package:intl/intl.dart';

class NewsDetailPage extends StatelessWidget {
  final int newsId;
  NewsDetailPage({required this.newsId});

  @override
  Widget build(BuildContext context) {
    // Giả định bạn fetch data dựa trên newsId ở đây
    return Scaffold(
      appBar: AppBar(actions: [IconButton(icon: Icon(Icons.share), onPressed: () {})]),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Tiêu đề bài viết", style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            Row(
              children: [
                Icon(Icons.person, size: 16, color: Colors.grey),
                Text(" Admin "),
                Icon(Icons.calendar_today, size: 16, color: Colors.grey),
                Text(" 12/10/2025"),
              ],
            ),
            Divider(height: 32),
            HtmlWidget(
              """<h6>Nội dung từ backend...</h6><p>Hỗ trợ render thẻ HTML như React</p>""",
            ),
            _buildCommentSection(),
          ],
        ),
      ),
    );
  }

  Widget _buildCommentSection() {
    return Column(
      children: [
        TextField(decoration: InputDecoration(hintText: "Bình luận...")),
        ElevatedButton(onPressed: () {}, child: Text("Gửi"))
      ],
    );
  }
}