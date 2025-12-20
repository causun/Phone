import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'context/cart_provider.dart';
import 'pages/auth/login.dart';
import 'pages/user/home_page.dart';
import 'pages/user/products_page.dart';
import 'pages/user/cart_page.dart';
import 'pages/user/profile_page.dart';
import 'pages/user/checkout_page.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => CartProvider(),
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Mobile Store',
      theme: ThemeData(primarySwatch: Colors.blue),
      initialRoute: '/login',
      routes: {
        '/login': (context) => const LoginPage(),
        '/user/home': (context) => const HomePage(),
        '/user/products': (context) => const ProductsPage(), // THÊM DÒNG NÀY
        // '/user/cart': (context) => const CartPage(),
        '/user/profile': (context) => const ProfilePage(),
        // '/user/checkout': (context) => const CheckoutPage(),
},
    );
  }
}