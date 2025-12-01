package com.example.mobilestore.dto;

import lombok.Data;
import java.util.List;

public class OrderDTO {
    @Data
    public static class OrderItemRequest {
        private Long productId;
        private int quantity;
    }

    @Data
    public static class OrderRequest {
        private List<OrderItemRequest> items;
    }

    @Data
    public static class OrderItemResponse {
        private String productName;
        private int quantity;
        private double price;
    }

    @Data
    public static class OrderResponse {
        private Long orderId;
        private boolean approved;
        private String userName;
        private List<OrderItemResponse> items;
    }
}
