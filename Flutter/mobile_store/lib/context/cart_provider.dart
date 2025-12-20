import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class CartProvider with ChangeNotifier {
  List<Map<String, dynamic>> _items = [];

  CartProvider() {
    _loadCart(); // Tự động load giỏ hàng khi khởi tạo
  }

  List<Map<String, dynamic>> get cartItems => _items;

  // Tổng số lượng sản phẩm (hiển thị ở Header)
  int get count => _items.fold(0, (sum, item) => sum + (item['quantity'] as int));

  // Load từ bộ nhớ máy (giống localStorage.getItem)
  Future<void> _loadCart() async {
    final prefs = await SharedPreferences.getInstance();
    final String? savedData = prefs.getString('cart');
    if (savedData != null) {
      _items = List<Map<String, dynamic>>.from(jsonDecode(savedData));
      notifyListeners();
    }
  }

  // Lưu vào bộ nhớ máy (giống localStorage.setItem)
  Future<void> _saveCart() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('cart', jsonEncode(_items));
  }

  void addToCart(dynamic product, int quantity) {
    int index = _items.indexWhere((item) => item['id'] == product['id']);
    if (index >= 0) {
      _items[index]['quantity'] += quantity;
    } else {
      _items.add({
        ...product,
        'quantity': quantity,
      });
    }
    _saveCart();
    notifyListeners();
  }

  void updateQty(int id, int newQty) {
    int index = _items.indexWhere((item) => item['id'] == id);
    if (index >= 0) {
      if (newQty <= 0) {
        _items.removeAt(index);
      } else {
        _items[index]['quantity'] = newQty;
      }
      _saveCart();
      notifyListeners();
    }
  }

  void removeFromCart(int id) {
    _items.removeWhere((item) => item['id'] == id);
    _saveCart();
    notifyListeners();
  }

  void clearCart() {
    _items.clear();
    _saveCart();
    notifyListeners();
  }
}