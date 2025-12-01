import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import axios from "../api/axios";

export default function ProductCard({ product }) {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = () => {
    const updated = wishlist.some(i => i.id === product.id)
      ? wishlist.filter(i => i.id !== product.id)
      : [...wishlist, product];
    setWishlist(updated);
  };

  const addToCart = () => {
    axios.post("/cart", { productId: product.id })
      .then(() => alert("Đã thêm vào giỏ hàng!"))
      .catch(err => console.error(err));
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  return (
    <div className="product-card bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition">
      <div className="product-image-wrapper relative h-48 bg-gray-100">
        <img src={product.mainImage} alt={product.name} className="w-full h-full object-cover" />
        <button
          className={`btn-wishlist absolute top-2 left-2 p-2 rounded-full border ${wishlist.some(w => w.id === product.id) ? "bg-red-100 text-red-500 border-red-500" : "bg-white border-gray-300"}`}
          onClick={toggleWishlist}
        >
          <Heart size={16} />
        </button>
      </div>

      <div className="p-4">
        <p className="text-gray-500 text-sm">{product.category?.name}</p>
        <h3 className="font-semibold text-base my-1">{product.name}</h3>
        <p className="text-lg font-bold">{formatPrice(product.price)}</p>
        <button
          onClick={addToCart}
          className="w-full mt-2 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 flex justify-center items-center gap-2"
        >
          <ShoppingCart size={16} /> Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}
