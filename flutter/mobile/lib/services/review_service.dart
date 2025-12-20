import '../models/review.dart';
import 'api_client.dart';

class ReviewService {
  static Future<List<Review>> getByProduct(int productId) async {
    final res = await ApiClient.get("/reviews/product/$productId");
    final list = res["data"] ?? res;
    return (list as List).map((e) => Review.fromJson(e)).toList();
  }
}
