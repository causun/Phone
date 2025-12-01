import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function CategorySidebar({ selectedCategory, onSelectCategory, onSelectPrice }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-2">Danh mục</h4>
        <ul>
          <li className={`cursor-pointer ${selectedCategory === null ? "font-bold" : ""}`} onClick={() => onSelectCategory(null)}>Tất cả</li>
          {categories.map(c => (
            <li
              key={c.id}
              className={`cursor-pointer ${selectedCategory === c.id ? "font-bold" : ""}`}
              onClick={() => onSelectCategory(c.id)}
            >
              {c.name} ({c.count})
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Giá</h4>
        <ul>
          <li onClick={() => onSelectPrice(null)} className="cursor-pointer">Tất cả</li>
          <li onClick={() => onSelectPrice("under-500k")} className="cursor-pointer">Dưới 500.000₫</li>
          <li onClick={() => onSelectPrice("500k-1m")} className="cursor-pointer">500.000₫ - 1.000.000₫</li>
          <li onClick={() => onSelectPrice("1m-2m")} className="cursor-pointer">1.000.000₫ - 2.000.000₫</li>
          <li onClick={() => onSelectPrice("above-2m")} className="cursor-pointer">Trên 2.000.000₫</li>
        </ul>
      </div>
    </div>
  );
}
