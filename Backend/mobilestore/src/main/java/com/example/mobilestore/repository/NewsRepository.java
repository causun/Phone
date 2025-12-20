package com.example.mobilestore.repository;

import com.example.mobilestore.model.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, Long> {
}
