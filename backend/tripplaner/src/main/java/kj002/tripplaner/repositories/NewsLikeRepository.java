package kj002.tripplaner.repositories;

import kj002.tripplaner.models.NewsLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NewsLikeRepository extends JpaRepository<NewsLike, Long> {

    Optional<NewsLike> findByNewsIdAndUserId(Long newsId, Long userId);

    List<NewsLike> findByNewsId(Long newsId);

    int countByNewsId(Long newsId);
}
