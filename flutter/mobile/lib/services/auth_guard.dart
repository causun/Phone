import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthGuard {
  static Future<bool> isLoggedIn() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString("token");
    return token != null && token.isNotEmpty;
  }

  static Future<void> requireLogin(
    BuildContext context,
    VoidCallback onSuccess,
  ) async {
    final loggedIn = await isLoggedIn();

    if (loggedIn) {
      onSuccess();
    } else {
      Navigator.pushNamed(context, "/login");
    }
  }
}
