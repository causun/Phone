//package kj002.demo7.models;
//
//import jakarta.persistence.*;
//import lombok.*;
//
//import java.util.Date;
//
//@Entity
//@Table(name = "product_reviews")
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//public class ProductReview {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private int rating; // 1 - 5 sao
//
//    @Column(columnDefinition = "TEXT")
//    private String comment;
//
//    @Temporal(TemporalType.TIMESTAMP)
//    private Date createdAt = new Date();
//
//    // Quan hệ với Product
//    @ManyToOne
//    @JoinColumn(name = "product_id")
//    private Product product;
//
//    // Quan hệ với User (người mua)
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;
//
//    // Liên kết với chi tiết đơn hàng
//    @OneToOne
//    @JoinColumn(name = "order_detail_id", unique = true)
//    private OrderDetail orderDetail;
//}
