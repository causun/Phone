import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../context/cart_provider.dart';

class UserHeader extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  // Thêm ScaffoldState để mở Drawer từ nút 3 gạch custom
  const UserHeader({super.key, this.title = "MOBILE STORE"});

  @override
  Widget build(BuildContext context) {
    final cartCount = context.watch<CartProvider>().count;

    return AppBar(
      backgroundColor: Colors.white,
      elevation: 0.5,
      centerTitle: true,
      // Nút 3 gạch (Menu)
      leading: IconButton(
        icon: const Icon(Icons.menu, color: Colors.black),
        onPressed: () => Scaffold.of(context).openDrawer(),
      ),
      title: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: Colors.blue,
              borderRadius: BorderRadius.circular(6),
            ),
            child: const Text("M", style: TextStyle(color: Colors.white,  fontSize: 16)),
          ),
          const SizedBox(width: 8),
          Text(
            title,
            style: const TextStyle(color: Colors.black, fontWeight: FontWeight.w900, fontSize: 18, letterSpacing: 1),
          ),
        ],
      ),
      actions: [
        Stack(
          alignment: Alignment.center,
          children: [
            IconButton(
              icon: const Icon(Icons.shopping_cart_outlined, color: Colors.black, size: 26),
              onPressed: () => Navigator.pushNamed(context, '/user/cart'),
            ),
            if (cartCount > 0)
              Positioned(
                right: 6,
                top: 6,
                child: Container(
                  padding: const EdgeInsets.all(2),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFF3B30), // Apple Red
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: Colors.white, width: 1.5),
                  ),
                  constraints: const BoxConstraints(minWidth: 18, minHeight: 18),
                  child: Text(
                    '$cartCount',
                    style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                    textAlign: TextAlign.center,
                  ),
                ),
              ),
          ],
        ),
        const SizedBox(width: 5),
      ],
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}