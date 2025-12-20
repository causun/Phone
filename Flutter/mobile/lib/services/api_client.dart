import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

import '../core/constants/api.dart';
import '../core/constants/storage_keys.dart';

class ApiClient {
  // ================= HEADERS =================
  static Future<Map<String, String>> _headers({bool auth = false}) async {
    final headers = <String, String>{
      "Content-Type": "application/json",
      "Accept": "application/json",
    };

    if (auth) {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString(tokenKey);
      if (token != null && token.isNotEmpty) {
        headers["Authorization"] = "Bearer $token";
      }
    }
    return headers;
  }

  // ================= HANDLE RESPONSE =================
  static dynamic _handleResponse(http.Response res) {
    try {
      final decoded = jsonDecode(utf8.decode(res.bodyBytes));

      if (res.statusCode >= 200 && res.statusCode < 300) {
        return decoded;
      } else {
        throw Exception(
          decoded is Map && decoded["message"] != null
              ? decoded["message"]
              : "HTTP ${res.statusCode}",
        );
      }
    } catch (e) {
      throw Exception("Invalid response format");
    }
  }

  // ================= GET =================
  static Future<dynamic> get(String path, {bool auth = false}) async {
    final res = await http.get(
      Uri.parse("$baseUrl$path"),
      headers: await _headers(auth: auth),
    );
    return _handleResponse(res);
  }

  // ================= POST =================
  static Future<dynamic> post(
    String path,
    dynamic body, {
    bool auth = false,
  }) async {
    final res = await http.post(
      Uri.parse("$baseUrl$path"),
      headers: await _headers(auth: auth),
      body: jsonEncode(body),
    );
    return _handleResponse(res);
  }

  // ================= PUT =================
  static Future<dynamic> put(
    String path,
    dynamic body, {
    bool auth = false,
  }) async {
    final res = await http.put(
      Uri.parse("$baseUrl$path"),
      headers: await _headers(auth: auth),
      body: jsonEncode(body),
    );
    return _handleResponse(res);
  }
}
