package kj002.tripplaner.dtos;

import lombok.Data;

@Data
public class ProductDetailDTO {
    private Long id;
    private String name;
    private BrandDTO brand;
    private Double price;
    private String screenSize;
    private String ram;
    private String storage;
    private String chipset;
    private String camera;
    private String battery;
    private String os;
    private String color;
    private String description;
    private String status;
    private Integer quantityInStock;
    private java.util.List<String> imageUrls;
}
