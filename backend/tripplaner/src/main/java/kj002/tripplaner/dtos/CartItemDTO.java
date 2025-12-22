package kj002.tripplaner.dtos;

import lombok.Data;

@Data
public class CartItemDTO {
    private Long id;
    private int quantity;
    private ProductDTO product; // Sử dụng ProductDTO bạn đã có

    @Data
    public static class ProductDTO {
        private Long id;
        private String name;
        private Double price;
        private String imageUrl;
    }
}