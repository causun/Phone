import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

import '../models/cart_item.dart';

class CartService {
  // ================= GET CART =================
  static Future<List<CartItem>> getCart(String email) async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString("cart_$email");

    if (raw == null) return [];

    final List list = jsonDecode(raw);
    return list.map((e) => CartItem.fromJson(e)).toList();
  }

  // ================= SAVE CART =================
  static Future<void> _saveCart(String email, List<CartItem> cart) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
      "cart_$email",
      jsonEncode(cart.map((e) => e.toJson()).toList()),
    );
  }

  // ================= ADD ITEM =================
  static Future<void> addItem(String email, CartItem item) async {
    final cart = await getCart(email);

    final index = cart.indexWhere((i) => i.id == item.id);
    if (index >= 0) {
      cart[index].quantity += item.quantity;
    } else {
      cart.add(item);
    }

    await _saveCart(email, cart);
  }

  // ================= UPDATE QTY =================
  static Future<void> updateQty(String email, int productId, int delta) async {
    final cart = await getCart(email);

    for (int i = 0; i < cart.length; i++) {
      if (cart[i].id == productId) {
        cart[i].quantity += delta;

        // ✅ nếu <= 0 thì xoá
        if (cart[i].quantity <= 0) {
          cart.removeAt(i);
        }
        break;
      }
    }

    await _saveCart(email, cart);
  }

  // ================= REMOVE ITEM =================
  static Future<void> removeItem(String email, int productId) async {
    final cart = await getCart(email)
      ..removeWhere((i) => i.id == productId);

    await _saveCart(email, cart);
  }

  // ================= CLEAR CART =================
  static Future<void> clear(String email) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove("cart_$email");
  }

  // ================= TOTAL QUANTITY =================
  static Future<int> getTotalQuantity(String email) async {
    final cart = await getCart(email);

    return cart.fold<int>(0, (sum, item) => sum + item.quantity);
  }
}
