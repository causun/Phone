package com.example.mobilestore.dto;

import com.example.mobilestore.model.ProductStatus;
import lombok.Data;
import java.util.List;

public class ProductDTO {
    @Data
    public static class ProductResponse {
        private Long id;
        private String name;
        private String categoryName;
        private String mainImage;
        private List<String> subImages;
        private double price;
        private int stock;
        private ProductStatus status;
    }
}
