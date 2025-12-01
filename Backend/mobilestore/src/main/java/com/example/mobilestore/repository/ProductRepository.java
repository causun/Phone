package com.example.mobilestore.repository;

import com.example.mobilestore.model.Product;
import com.example.mobilestore.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Sort;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContainingIgnoreCase(String name); // Tìm kiếm theo tên
    List<Product> findByCategory(Category category); // Lọc theo loại
    List<Product> findByActiveTrue(); // Lấy sản phẩm active

    List<Product> findByActiveTrue(Sort sort);
}
