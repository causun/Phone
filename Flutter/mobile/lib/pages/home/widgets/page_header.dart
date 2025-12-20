import 'package:flutter/material.dart';
import '../../../models/user.dart';

class PageHeader extends StatelessWidget implements PreferredSizeWidget {
  final User? user;
  final VoidCallback onLogout;
  final int cartCount;

  const PageHeader({
    super.key,
    required this.user,
    required this.onLogout,
    required this.cartCount,
  });

  @override
  Size get preferredSize => const Size.fromHeight(64);

  @override
  Widget build(BuildContext context) {
    final isMobile = MediaQuery.of(context).size.width < 768;

    return AppBar(
      backgroundColor: Colors.white,
      elevation: 0,
      automaticallyImplyLeading: false,
      toolbarHeight: 64,
      titleSpacing: 16,
      title: _logo(context),
      actions: [
        _cart(context),
        isMobile ? _mobileMenu(context) : _userMenu(context),
        const SizedBox(width: 8),
      ],
      bottom: PreferredSize(
        preferredSize: const Size.fromHeight(1),
        child: Container(height: 1, color: Colors.grey.shade200),
      ),
    );
  }

  Widget _logo(BuildContext context) {
    return GestureDetector(
      onTap: () => Navigator.pushNamed(context, "/"),
      child: RichText(
        text: const TextSpan(
          style: TextStyle(fontSize: 22, fontWeight: FontWeight.w900),
          children: [
            TextSpan(
              text: "Mobile",
              style: TextStyle(color: Color(0xff0a84ff)),
            ),
            TextSpan(
              text: "Store",
              style: TextStyle(color: Color(0xffd70018)),
            ),
          ],
        ),
      ),
    );
  }

  Widget _cart(BuildContext context) {
    return Stack(
      clipBehavior: Clip.none,
      children: [
        IconButton(
          icon: const Icon(Icons.shopping_cart_outlined),
          iconSize: 26,
          color: Colors.black87,
          onPressed: () {
            if (user == null) {
              Navigator.pushNamed(context, "/login");
            } else {
              Navigator.pushNamed(context, "/cart");
            }
          },
        ),
        if (cartCount > 0)
          Positioned(
            right: 6,
            top: 6,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
              decoration: BoxDecoration(
                color: Colors.redAccent,
                borderRadius: BorderRadius.circular(10),
              ),
              child: Text(
                "$cartCount",
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 11,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
      ],
    );
  }

  Widget _userMenu(BuildContext context) {
    if (user == null) {
      return TextButton(
        onPressed: () => Navigator.pushNamed(context, "/login"),
        child: const Text(
          "Đăng nhập",
          style: TextStyle(color: Colors.blue, fontWeight: FontWeight.w600),
        ),
      );
    }

    final displayChar = user!.fullName.isNotEmpty
        ? user!.fullName[0].toUpperCase()
        : "U";

    return PopupMenuButton<String>(
      offset: const Offset(0, 48),
      onSelected: (value) {
        if (value == "logout") onLogout();
        if (value == "profile") {
          Navigator.pushNamed(context, "/profile");
        }
      },
      itemBuilder: (_) => const [
        PopupMenuItem(value: "profile", child: Text("👤 Thông tin")),
        PopupMenuItem(value: "logout", child: Text("🚪 Đăng xuất")),
      ],
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12),
        child: CircleAvatar(
          radius: 18,
          backgroundColor: Colors.blue.shade100,
          child: Text(
            displayChar,
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              color: Colors.black,
            ),
          ),
        ),
      ),
    );
  }

  Widget _mobileMenu(BuildContext context) {
    return IconButton(
      icon: const Icon(Icons.menu),
      color: Colors.black87,
      onPressed: () {
        showModalBottomSheet(
          context: context,
          shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
          ),
          builder: (_) => _mobileSheet(context),
        );
      },
    );
  }

  Widget _mobileSheet(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            _mobileItem(context, Icons.home, "Trang chủ", "/"),
            _mobileItem(context, Icons.newspaper, "Tin tức", "/news"),
            _mobileItem(context, Icons.support_agent, "Liên hệ", "/contact"),
            const Divider(height: 24),
            user == null
                ? _mobileItem(context, Icons.login, "Đăng nhập", "/login")
                : ListTile(
                    leading: const Icon(Icons.logout),
                    title: const Text("Đăng xuất"),
                    onTap: () {
                      Navigator.pop(context);
                      onLogout();
                    },
                  ),
          ],
        ),
      ),
    );
  }

  Widget _mobileItem(
    BuildContext context,
    IconData icon,
    String text,
    String route,
  ) {
    return ListTile(
      leading: Icon(icon),
      title: Text(text, style: const TextStyle(fontWeight: FontWeight.w500)),
      onTap: () {
        Navigator.pop(context);
        Navigator.pushNamed(context, route);
      },
    );
  }
}
