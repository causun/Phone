//package kj002.demo7.services;
//
//import kj002.demo7.models.*;
//import kj002.demo7.repositories.*;
//import org.springframework.stereotype.Service;
//
//import java.util.Date;
//
//@Service
//public class ProductReviewService {
//
//    private final ProductRepository productRepository;
//    private final OrderDetailRepository orderDetailRepository;
//    private final ProductReviewRepository productReviewRepository;
//
//    public ProductReviewService(ProductRepository productRepository,
//                                OrderDetailRepository orderDetailRepository,
//                                ProductReviewRepository productReviewRepository) {
//        this.productRepository = productRepository;
//        this.orderDetailRepository = orderDetailRepository;
//        this.productReviewRepository = productReviewRepository;
//    }
//
//    public ProductReview addReview(Long orderDetailId, int rating, String comment, User user) {
//        // 🔹 Lấy chi tiết đơn hàng
//        OrderDetail orderDetail = orderDetailRepository.findById(orderDetailId)
//                .orElseThrow(() -> new RuntimeException("Không tìm thấy chi tiết đơn hàng"));
//
//        // 🔹 Kiểm tra đơn hàng đã giao chưa
//        if (orderDetail.getOrder().getStatus() != OrderStatus.DELIVERED) {
//            throw new RuntimeException("Chỉ được đánh giá khi đơn hàng đã giao thành công!");
//        }
//
//        // 🔹 Kiểm tra người đánh giá có đúng người mua không
//        if (!orderDetail.getOrder().getUser().getId().equals(user.getId())) {
//            throw new RuntimeException("Bạn không thể đánh giá sản phẩm của người khác!");
//        }
//
//        // 🔹 Kiểm tra đã đánh giá chưa
//        if (productReviewRepository.findByOrderDetailId(orderDetailId).isPresent()) {
//            throw new RuntimeException("Sản phẩm này đã được đánh giá rồi!");
//        }
//
//        // 🔹 Tạo đánh giá mới
//        ProductReview review = new ProductReview();
//        review.setRating(rating);
//        review.setComment(comment);
//        review.setProduct(orderDetail.getProduct());
//        review.setUser(user);
//        review.setOrderDetail(orderDetail);
//        review.setCreatedAt(new Date());
//
//        return productReviewRepository.save(review);
//    }
//}
