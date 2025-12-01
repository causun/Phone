import { useEffect, useState } from "react";
import axios from "../../api/axios";
import UserHeader from "../../components/UserHeader";
import UserFooter from "../../components/UserFooter";
import ProductCard from "../../components/ProductCard";
import CategorySidebar from "../../components/CategorySidebar";
import "../../styles/product-page.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [sortBy, setSortBy] = useState("popular");

  const fetchProducts = () => {
    let url = `/products?`;
    if (selectedCategory) url += `category=${selectedCategory}&`;
    if (selectedPrice) url += `price=${selectedPrice}&`;
    if (sortBy) url += `sort=${sortBy}`;

    axios.get(url)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedPrice, sortBy]);

  return (
    <>
      <UserHeader />

      <main className="max-w-7xl mx-auto flex gap-6 px-4 py-8">
        <aside className="w-64 hidden lg:block">
          <CategorySidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onSelectPrice={setSelectedPrice}
          />
        </aside>

        <section className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p>Hiển thị {products.length} sản phẩm</p>
            <select
              className="border px-3 py-2 rounded"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="popular">Phổ biến</option>
              <option value="price-asc">Giá: thấp → cao</option>
              <option value="price-desc">Giá: cao → thấp</option>
              <option value="newest">Mới nhất</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </main>

      <UserFooter />
    </>
  );
}
