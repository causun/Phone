class Order {
  final int id;
  final String status;
  final String fullName;
  final String phone;
  final String address;
  final double totalPrice;
  final List<OrderItem> items;

  Order({
    required this.id,
    required this.status,
    required this.fullName,
    required this.phone,
    required this.address,
    required this.totalPrice,
    required this.items,
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: json['id'],
      status: json['status'],
      fullName: json['fullName'],
      phone: json['phone'],
      address: json['address'],
      totalPrice: (json['totalPrice'] as num).toDouble(),
      items: (json['items'] as List? ?? [])
          .map((e) => OrderItem.fromJson(e))
          .toList(),
    );
  }

  String get statusText {
    switch (status) {
      case "PENDING":
        return "Chờ xác nhận";
      case "CONFIRMED":
        return "Đã xác nhận";
      case "SHIPPING":
        return "Đang giao";
      case "COMPLETED":
        return "Hoàn thành";
      case "CANCELLED":
        return "Đã huỷ";
      default:
        return status;
    }
  }
}

class OrderItem {
  final int productId;
  final String productName;
  final int quantity;
  final double price;
  final String? imageUrl;

  OrderItem({
    required this.productId,
    required this.productName,
    required this.quantity,
    required this.price,
    this.imageUrl,
  });

  factory OrderItem.fromJson(Map<String, dynamic> json) {
    return OrderItem(
      productId: json['productId'],
      productName: json['productName'],
      quantity: json['quantity'],
      price: (json['price'] as num).toDouble(),
      imageUrl: json['imageUrl'],
    );
  }
}
