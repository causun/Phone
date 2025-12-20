import '../models/product.dart';
import '../models/brand.dart';
import 'api_client.dart';

class ProductService {
  // ================= GET ALL PRODUCTS =================
  static Future<List<Product>> getProducts() async {
    final res = await ApiClient.get("/products");

    List<Map<String, dynamic>> list = [];

    if (res is Map && res["data"] is List) {
      list = List<Map<String, dynamic>>.from(
        (res["data"] as List).map((e) => Map<String, dynamic>.from(e)),
      );
    } else if (res is List) {
      list = List<Map<String, dynamic>>.from(
        res.map((e) => Map<String, dynamic>.from(e)),
      );
    }

    // ✅ GIỮ NGUYÊN THUẬT TOÁN LỌC ACTIVE
    return list
        .where((p) => p["status"] == null || p["status"] == "ACTIVE")
        .map((e) => Product.fromJson(e))
        .toList();
  }

  // ================= GET PRODUCT DETAIL =================
  static Future<Product?> getDetail(int id) async {
    final res = await ApiClient.get("/products/$id");

    if (res is Map && res["data"] is Map) {
      return Product.fromJson(Map<String, dynamic>.from(res["data"]));
    }

    if (res is Map) {
      return Product.fromJson(Map<String, dynamic>.from(res));
    }

    return null;
  }

  // ================= GET BRANDS =================
  static Future<List<Brand>> getBrands() async {
    final res = await ApiClient.get("/brands");

    if (res is Map && res["data"] is List) {
      return (res["data"] as List)
          .map((e) => Brand.fromJson(Map<String, dynamic>.from(e)))
          .toList();
    }

    if (res is List) {
      return res
          .map((e) => Brand.fromJson(Map<String, dynamic>.from(e)))
          .toList();
    }

    return [];
  }

  // ================= GET BY ID (🔥 FIX LỖI CHÍNH) =================
  static Future<Product?> getById(int id) async {
    // 👉 alias cho getDetail – KHÔNG ĐỔI THUẬT TOÁN
    return getDetail(id);
  }
}
