class Product {
  final int id;
  final String name;
  final double price;
  final String? image;
  final String? categoryName;

  Product({required this.id, required this.name, required this.price, this.image, this.categoryName});

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'],
      name: json['name'],
      price: json['price'].toDouble(),
      image: json['image'],
      categoryName: json['category'] != null ? json['category']['name'] : 'Smartphone',
    );
  }
}