import '../models/compare_result.dart';
import 'api_client.dart';

class CompareService {
  static Future<CompareResult> compare(int p1, int p2) async {
    final res = await ApiClient.get("/compare?p1=$p1&p2=$p2");

    return CompareResult.fromJson(res);
  }
}
