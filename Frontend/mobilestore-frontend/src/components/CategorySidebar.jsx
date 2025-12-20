import React from "react";

export default function CategorySidebar({ selectedCategory, onSelectCategory, selectedPrice, onSelectPrice }) {
  const categories = ["Điện thoại", "Laptop", "Phụ kiện"];
  const prices = ["<1 triệu", "1-5 triệu", "5-10 triệu", ">10 triệu"];

  return (
    <div className="category-sidebar">
      <h3>Danh mục</h3>
      <ul>
        {categories.map(cat => (
          <li
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </li>
        ))}
      </ul>

      <h3>Khoảng giá</h3>
      <ul>
        {prices.map(p => (
          <li
            key={p}
            className={selectedPrice === p ? "active" : ""}
            onClick={() => onSelectPrice(p)}
          >
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
