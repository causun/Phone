package kj002.tripplaner.repositories;

import kj002.tripplaner.models.NewsComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NewsCommentRepository extends JpaRepository<NewsComment, Long> {

    List<NewsComment> findByNewsIdOrderByCreatedAtDesc(Long newsId);


    int countByNewsId(Long newsId);
}
