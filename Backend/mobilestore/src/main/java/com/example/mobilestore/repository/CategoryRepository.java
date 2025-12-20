package com.example.mobilestore.repository;

import com.example.mobilestore.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByActiveTrue(); // Lấy danh sách loại hàng đang active
}
