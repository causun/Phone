import 'package:shared_preferences/shared_preferences.dart';

import '../models/user.dart';
import '../core/constants/storage_keys.dart';
import 'api_client.dart';

class AuthService {
  // ================= LOGIN =================
  static Future<String?> login(String email, String password) async {
    final res = await ApiClient.post("/auth/login", {
      "email": email,
      "password": password,
    });

    final token = res["accessToken"] ?? res["access_token"] ?? res["token"];
    if (token == null) return null;

    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(tokenKey, token);

    return token;
  }

  // ================= GET CURRENT USER =================
  static Future<User?> getMe() async {
    final res = await ApiClient.get("/auth/user/me", auth: true);
    if (res == null || res["data"] == null) return null;
    return User.fromJson(res["data"]);
  }

  // ================= LOGOUT =================
  static Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(tokenKey);
  }

  // ================= CHANGE PASSWORD =================
  static Future<void> changePassword(Map<String, dynamic> body) async {
    await ApiClient.post("/auth/change-password", body, auth: true);
  }

  // ================= REGISTER =================
  static Future<void> register(Map<String, dynamic> body) async {
    await ApiClient.post("/auth/register", body);
  }

  // ================= FORGOT PASSWORD =================
  static Future<void> sendResetOtp(String email) async {
    await ApiClient.post("/auth/send-reset-otp", {"email": email});
  }

  // ================= VERIFY REGISTER OTP =================
  static Future<void> verifyOtp(Map<String, dynamic> body) async {
    await ApiClient.post("/auth/verify-otp", body);
  }

  // ================= VERIFY RESET OTP =================
  static Future<void> verifyResetOtp(Map<String, dynamic> body) async {
    await ApiClient.post("/auth/verify-reset-otp", body);
  }
}
