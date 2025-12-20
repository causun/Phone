package com.example.mobilestore.repository;

import com.example.mobilestore.model.NewsComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NewsCommentRepository extends JpaRepository<NewsComment, Long> {

    List<NewsComment> findByNewsIdOrderByCreatedAtDesc(Long newsId);

    // 👉 Thêm method count
    int countByNewsId(Long newsId);
}
