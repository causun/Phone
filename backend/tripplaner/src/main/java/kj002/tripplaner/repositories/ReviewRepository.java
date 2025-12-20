package kj002.tripplaner.repositories;

import kj002.tripplaner.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    Optional<Review> findByUserIdAndProductIdAndOrderId(Long userId, Long productId, Long orderId);

    List<Review> findByProductId(Long productId);

    List<Review> findByUserId(Long userId);
}

