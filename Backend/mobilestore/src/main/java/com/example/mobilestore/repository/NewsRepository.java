package com.example.mobilestore.repository;

import com.example.mobilestore.model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NewsRepository extends JpaRepository<News, Long> {
    List<News> findTop10ByOrderByCreatedAtDesc(); // Lấy 10 tin mới nhất
    List<News> findAllByOrderByCreatedAtDesc();
}
