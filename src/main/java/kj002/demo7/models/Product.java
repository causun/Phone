package kj002.demo7.models;

import jakarta.persistence.*;
import lombok.*;
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

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private double price;

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
            cascade = CascadeType.ALL,
            mappedBy = "product",
            orphanRemoval = true
    )
    @JsonManagedReference
    private List<ProductImage> images;


    @ManyToOne
    @JoinColumn(name = "discount_id")
    private DiscountCode discountCode;


    @Transient
    private Double finalPrice;
}
