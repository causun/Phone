//package kj002.demo7.repositories;
//
//import kj002.demo7.models.ProductReview;
//import kj002.demo7.models.Product;
//import kj002.demo7.models.User;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.List;
//import java.util.Optional;
//
//public interface ProductReviewRepository extends JpaRepository<ProductReview, Long> {
//
//    List<ProductReview> findByProduct(Product product);
//
//    Optional<ProductReview> findByOrderDetailId(Long orderDetailId);
//
//    boolean existsByProductAndUser(Product product, User user);
//}
