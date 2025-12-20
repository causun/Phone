package com.example.mobilestore.dto;

import com.example.mobilestore.model.OrderItem;
import com.example.mobilestore.model.Order;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class OrderDTO {

    @Data
    public static class OrderResponse {
        private Long id;
        private Long userId;
        private String fullName;
        private String phone;
        private String address;
        private String orderCode;
        private LocalDateTime createdAt;
        private String status;
        private List<OrderItemResponse> items;

        // Thông tin tài khoản gốc
        private String accountName;
        private String accountEmail;
        private String accountPhone;
    }

    @Data
    public static class OrderItemResponse {
        private Long id;
        private Long productId;
        private String productName;
        private String image;
        private double price;
        private int quantity;
    }


}

