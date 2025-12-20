import 'brand.dart';

class Product {
  final int id;
  final String name;
  final double price;
  final int quantityInStock;

  // ⭐ RATING
  final double avgRating;
  final int totalReviews; // dùng cái này cho UI

  final List<String> imageUrls;
  final Brand? brand;

  // ===== SPEC =====
  final String ram;
  final String storage;
  final String chipset;
  final String camera;
  final String battery;
  final String screenSize;
  final String color;
  final String description;
  final String os;

  Product({
    required this.id,
    required this.name,
    required this.price,
    required this.quantityInStock,
    required this.avgRating,
    required this.totalReviews,
    required this.imageUrls,
    this.brand,
    required this.ram,
    required this.storage,
    required this.chipset,
    required this.camera,
    required this.battery,
    required this.screenSize,
    required this.color,
    required this.description,
    required this.os,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json["id"],
      name: json["name"],
      price: (json["price"] as num).toDouble(),
      quantityInStock: json["quantityInStock"] ?? 0,

      // ⭐ MAP RATING (AN TOÀN)
      avgRating: (json["avgRating"] ?? 0).toDouble(),
      totalReviews: json["totalReviews"] ?? 0,

      imageUrls:
          (json["imageUrls"] as List?)
              ?.map(
                (e) => e
                    .toString()
                    .replaceAll("localhost", "10.0.2.2")
                    .replaceAll("\\", "/"),
              )
              .toList() ??
          [],

      brand: json["brand"] != null ? Brand.fromJson(json["brand"]) : null,

      // ===== MAP SPEC =====
      ram: json["ram"] ?? "",
      storage: json["storage"] ?? "",
      chipset: json["chipset"] ?? "",
      camera: json["camera"] ?? "",
      battery: json["battery"] ?? "",
      screenSize: json["screenSize"] ?? "",
      color: json["color"] ?? "",
      description: json["description"] ?? "",
      os: json["os"] ?? "",
    );
  }
}
