package kj002.demo7.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String brand;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(nullable = false)
    private double price;

    @Column(nullable = false)
    private int quantityInStock = 0;

    private String screenSize;
    private String ram;
    private String storage;
    private String chipset;
    private String camera;
    private String battery;
    private String os;
    private String color;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private ProductStatus status = ProductStatus.ACTIVE;

    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REMOVE},
            mappedBy = "product",
            orphanRemoval = true
    )
    @JsonManagedReference
    private List<ProductImage> images;

    @ManyToMany(mappedBy = "products")
    @JsonIgnore
    private List<DiscountCode> discountCodes;
}


//Đánh giá sản phẩm
//    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<ProductReview> reviews;

//Trung bình đánh giá (cache)
// @Column(name = "average_rating")
// private Double averageRating = 0.0;

