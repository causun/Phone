package com.example.mobilestore.repository;

import com.example.mobilestore.model.NewsLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NewsLikeRepository extends JpaRepository<NewsLike, Long> {

    Optional<NewsLike> findByNewsIdAndUserId(Long newsId, Long userId);

    List<NewsLike> findByNewsId(Long newsId);

    // 👉 Thêm method count
    int countByNewsId(Long newsId);
}
