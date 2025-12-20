import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'news_detail_page.dart';

class NewsPage extends StatefulWidget {
  @override
  _NewsPageState createState() => _NewsPageState();
}

class _NewsPageState extends State<NewsPage> {
  List newsList = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchNews();
  }

  fetchNews() async {
    try {
      final response = await http.get(Uri.parse('http://192.168.1.138:8081/api/news'));
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        setState(() {
          // Backend thường trả về { success: true, data: [...] }
          newsList = data['data'] ?? data; 
          isLoading = false;
        });
      }
    } catch (e) {
      setState(() => isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Blog & Tin Tức")),
      body: isLoading 
        ? Center(child: CircularProgressIndicator())
        : SingleChildScrollView(
            child: Column(
              children: [
                _buildHeroSection(),
                Padding(
                  padding: EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("Bài viết mới nhất", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                      SizedBox(height: 16),
                      ListView.builder(
                        shrinkWrap: true,
                        physics: NeverScrollableScrollPhysics(),
                        itemCount: newsList.length,
                        itemBuilder: (context, index) {
                          final item = newsList[index];
                          return Card(
                            margin: EdgeInsets.only(bottom: 16),
                            child: ListTile(
                              title: Text(item['title'], style: TextStyle(fontWeight: FontWeight.bold)),
                              subtitle: Text(item['content'].replaceAll(RegExp(r'<[^>]*>'), '').substring(0, 100) + "..."),
                              trailing: Icon(Icons.arrow_forward_ios, size: 16),
                              onTap: () => Navigator.pushNamed(context, '/news-detail', arguments: item['id']),
                            ),
                          );
                        },
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
    );
  }

  Widget _buildHeroSection() {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(24),
      decoration: BoxDecoration(color: Colors.blueGrey[900]),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text("Tin công nghệ 2025", style: TextStyle(color: Colors.amber, fontWeight: FontWeight.bold)),
          SizedBox(height: 8),
          Text("Blog Mobile Store", style: TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }
}