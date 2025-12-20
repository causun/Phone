import 'package:intl/intl.dart';

class Helpers {
  static String formatPrice(double price) {
    // Format theo kiểu $ như web của bạn
    final formatter = NumberFormat.currency(symbol: "\$");
    return formatter.format(price);
  }
}