package kj002.tripplaner.services;

import kj002.tripplaner.dtos.*;
import kj002.tripplaner.models.*;
import kj002.tripplaner.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserReposiroty userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public ReviewDTO createOrUpdateReview(
            Long userId,
            Long orderId,
            Long productId,
            ReviewRequest req
    ) {
        if (userId == null)
            throw new RuntimeException("Unauthorized");

        // ===== CHECK ORDER =====
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (order.getStatus() != OrderStatus.COMPLETED)
            throw new RuntimeException("Chỉ được đánh giá khi đơn hàng đã giao thành công");

        Instant now = Instant.now();

        var opt = reviewRepository.findByUserIdAndProductIdAndOrderId(
                userId, productId, orderId
        );

        // ===== UPDATE REVIEW (KHÔNG GIỚI HẠN) =====
        if (opt.isPresent()) {
            Review exists = opt.get();
            exists.setRating(req.getRating());
            exists.setComment(req.getComment());
            exists.setUpdatedAt(now);
            return toDTO(reviewRepository.save(exists));
        }

        // ===== CREATE REVIEW =====
        Review review = new Review();
        review.setUser(userRepository.findById(userId).orElseThrow());
        review.setProduct(productRepository.findById(productId).orElseThrow());
        review.setOrder(order);
        review.setRating(req.getRating());
        review.setComment(req.getComment());
        review.setCreatedAt(now);
        review.setUpdatedAt(now);

        return toDTO(reviewRepository.save(review));
    }

    // ===== ADMIN REPLY =====
    public ReviewDTO replyReview(Long reviewId, String reply) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review không tồn tại"));

        review.setAdminReply(reply);
        review.setUpdatedAt(Instant.now());

        return toDTO(reviewRepository.save(review));
    }

    // ===== GET BY PRODUCT =====
    public List<ReviewDTO> getReviewsByProduct(Long productId) {
        return reviewRepository.findByProductId(productId)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    // ===== GET BY USER =====
    public List<ReviewDTO> getReviewsByUser(Long userId) {
        if (userId == null)
            throw new RuntimeException("Unauthorized");

        return reviewRepository.findByUserId(userId)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    // ===== GET ALL =====
    public List<ReviewDTO> getAllReviews() {
        return reviewRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    // ===== MAPPER =====
    private ReviewDTO toDTO(Review r) {
        ReviewDTO dto = new ReviewDTO();
        dto.setId(r.getId());
        dto.setRating(r.getRating());
        dto.setComment(r.getComment());
        dto.setAdminReply(r.getAdminReply());
        dto.setCreatedAt(r.getCreatedAt());
        dto.setUpdatedAt(r.getUpdatedAt());

        dto.setUserId(r.getUser().getId());
        dto.setUserName(r.getUser().getFullName());
        dto.setProductId(r.getProduct().getId());
        dto.setOrderId(r.getOrder().getId());

        return dto;
    }
}
