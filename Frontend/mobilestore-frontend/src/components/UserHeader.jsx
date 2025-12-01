import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import "../styles/header-footer.css";

export default function UserHeader() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    axios
      .get("/cart") // backend trả danh sách cart
      .then(res => setCartCount(res.data.length))
      .catch(err => console.error(err));
  }, []);

  return (
    <header className="user-header">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <h1 className="logo text-2xl font-bold text-blue-600">Mobile Store</h1>

        <nav className="flex gap-6">
          <Link to="/user/home" className="hover:text-blue-500">Trang chủ</Link>
          <Link to="/user/products" className="hover:text-blue-500">Sản phẩm</Link>
          <Link to="/user/blog" className="hover:text-blue-500">Blog</Link>
          <Link to="/user/contact" className="hover:text-blue-500">Liên hệ</Link>
        </nav>

        <div className="flex items-center gap-4">
          <User size={22} />
          <div className="relative">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
