package kj002.tripplaner.dtos;

import kj002.tripplaner.models.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    private Long id;
    private BrandDTO brand;

    private String name;
    private Double price;
    private Integer quantityInStock;
    private String screenSize;
    private String ram;
    private String storage;
    private String chipset;
    private String camera;
    private String battery;
    private String os;
    private String color;
    private String description;

    private Double avgRating;
    private Long totalReviews;

    private ProductStatus status;
    private LocalDateTime createdAt;

    private List<String> imageUrls;
}
