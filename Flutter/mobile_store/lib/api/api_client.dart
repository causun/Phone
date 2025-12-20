import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ApiClient {
  static const String baseUrl = 'http://192.168.43.175:8081/api';

  static Future<Map<String, String>> _headers() async {
    final prefs = await SharedPreferences.getInstance();
    final user = prefs.getString('user');

    String? token;
    if (user != null) { 
      token = jsonDecode(user)['token'];
    }

    return {
      'Content-Type': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };
  }

  static Future<http.Response> get(String path) async {
    return http.get(
      Uri.parse('$baseUrl$path'),
      headers: await _headers(),
    );
  }

  static Future<http.Response> post(String path, dynamic body) async {
    return http.post(
      Uri.parse('$baseUrl$path'),
      headers: await _headers(),
      body: jsonEncode(body),
    );
  }
}
