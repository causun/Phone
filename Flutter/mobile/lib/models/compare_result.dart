import 'product.dart';

class CompareResult {
  final Product p1;
  final Product p2;
  final String aiConclusion;

  CompareResult({
    required this.p1,
    required this.p2,
    required this.aiConclusion,
  });

  factory CompareResult.fromJson(Map<String, dynamic> json) {
    return CompareResult(
      p1: Product.fromJson(json['p1']),
      p2: Product.fromJson(json['p2']),
      aiConclusion: json['aiConclusion'] ?? "",
    );
  }
}
