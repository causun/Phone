package com.example.mobilestore.controller;

import com.example.mobilestore.dto.OrderDTO;
import com.example.mobilestore.model.Order;
import com.example.mobilestore.model.OrderStatus;
import com.example.mobilestore.service.OrderMapper;
import com.example.mobilestore.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // User tạo đơn hàng
    @PostMapping("/create")
    public Order create(@RequestBody Order order) {
        return orderService.saveOrder(order);
    }

    // User xem lịch sử
    @GetMapping("/user/{userId}")
    public List<OrderDTO.OrderResponse> getByUser(@PathVariable Long userId) {
        return orderService.getOrderByUser(userId).stream()
                .map(OrderMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Admin xem tất cả
    @GetMapping("/admin/all")
    public List<OrderDTO.OrderResponse> getAll() {
        return orderService.getAllOrders().stream()
                .map(OrderMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Admin xem chi tiết
    @GetMapping("/admin/{id}")
    public OrderDTO.OrderResponse getById(@PathVariable Long id) {
        Order order = orderService.getAllOrders().stream()
                .filter(o -> o.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Order not found: " + id));
        return OrderMapper.toDTO(order);
    }


    // Admin duyệt hoặc từ chối đơn hàng
    @PutMapping("/admin/update/{id}/{status}")
    public Order updateStatus(
            @PathVariable Long id,
            @PathVariable OrderStatus status
    ) {
        return orderService.updateStatus(id, status);
    }

}
