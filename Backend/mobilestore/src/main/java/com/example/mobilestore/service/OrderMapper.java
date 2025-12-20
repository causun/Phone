package com.example.mobilestore.service;

import com.example.mobilestore.dto.OrderDTO;
import com.example.mobilestore.model.Order;
import com.example.mobilestore.model.OrderItem;

import java.util.List;
import java.util.stream.Collectors;

public class OrderMapper {

    public static OrderDTO.OrderResponse toDTO(Order order) {
        OrderDTO.OrderResponse dto = new OrderDTO.OrderResponse();
        dto.setId(order.getId());
        dto.setUserId(order.getUserId());
        dto.setFullName(order.getFullName());
        dto.setPhone(order.getPhone());
        dto.setAddress(order.getAddress());
        dto.setOrderCode(order.getOrderCode());
        dto.setCreatedAt(order.getCreatedAt());
        dto.setStatus(order.getStatus().name());

        // ÁNH XẠ THÔNG TIN TỪ BẢNG USER (Nếu tồn tại user)
        if (order.getUser() != null) {
            dto.setAccountName(order.getUser().getName());
            dto.setAccountEmail(order.getUser().getEmail());
            dto.setAccountPhone(order.getUser().getPhone());
        }

        List<OrderDTO.OrderItemResponse> items = order.getItems().stream()
                .map(OrderMapper::toItemDTO)
                .collect(Collectors.toList());
        dto.setItems(items);

        return dto;
    }

    public static OrderDTO.OrderItemResponse toItemDTO(OrderItem item) {
        OrderDTO.OrderItemResponse dto = new OrderDTO.OrderItemResponse();
        dto.setId(item.getId());
        dto.setProductId(item.getProductId());
        dto.setProductName(item.getProductName());
        dto.setImage(item.getImage());
        dto.setPrice(item.getPrice());
        dto.setQuantity(item.getQuantity());
        return dto;
    }
}
