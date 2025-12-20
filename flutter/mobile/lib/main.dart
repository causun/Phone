import 'package:flutter/material.dart';

// ================= PAGES =================
import 'pages/home/home_page.dart';
import 'pages/auth/login_page.dart';
import 'pages/cart/cart_page.dart';
import 'pages/product/product_detail_page.dart';
import 'pages/checkout/checkout_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      initialRoute: "/",

      routes: {
        "/": (context) => const HomePage(),
        "/login": (context) => const LoginPage(),
        "/cart": (context) => const CartPage(),
        "/checkout": (context) => const CheckoutPage(),
      },

      onGenerateRoute: (settings) {
        print("➡️ ROUTE: ${settings.name}, args: ${settings.arguments}");

        if (settings.name == "/product-detail") {
          final id = settings.arguments as int;
          return MaterialPageRoute(builder: (_) => ProductDetailPage(id: id));
        }
        return null;
      },
    );
  }
}
