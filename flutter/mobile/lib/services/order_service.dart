import '../models/order.dart';
import '../models/cart_item.dart';
import 'api_client.dart';

class OrderService {
  // ================= MY ORDERS =================
  static Future<List<Order>> myOrders() async {
    final res = await ApiClient.get("/orders/my", auth: true);

    // backend có thể trả List hoặc {data: []}
    final List list = res is List ? res : (res["data"] as List? ?? []);

    return list.map((e) => Order.fromJson(e)).toList();
  }

  // ================= ORDER DETAIL =================
  static Future<Order> getDetail(int id) async {
    final res = await ApiClient.get("/orders/$id", auth: true);
    final data = res["data"] ?? res;
    return Order.fromJson(data);
  }

  // ================= PLACE ORDER =================
  static Future<void> placeOrder({
    required String fullName,
    required String phone,
    required String address,
    required String note,
    required List<CartItem> items,
  }) async {
    await ApiClient.post("/orders", {
      "fullName": fullName,
      "phone": phone,
      "address": address,
      "note": note,
      "items": items
          .map((i) => {"productId": i.id, "quantity": i.quantity})
          .toList(),
    }, auth: true);
  }
}
