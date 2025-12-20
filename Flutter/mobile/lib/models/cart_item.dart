class CartItem {
  final int id;
  final String name;
  final double price;
  int quantity;
  final String? image;

  CartItem({
    required this.id,
    required this.name,
    required this.price,
    required this.quantity,
    this.image,
  });

  factory CartItem.fromJson(Map<String, dynamic> json) {
    return CartItem(
      id: json['id'],
      name: json['name'],
      price: (json['price'] as num).toDouble(),
      quantity: json['quantity'],
      image:
          json['imageUrls'] != null &&
              json['imageUrls'] is List &&
              json['imageUrls'].isNotEmpty
          ? json['imageUrls'][0]
          : null,
    );
  }

  Map<String, dynamic> toJson() => {
    "id": id,
    "name": name,
    "price": price,
    "quantity": quantity,
    "imageUrls": image != null ? [image] : [],
  };
}
