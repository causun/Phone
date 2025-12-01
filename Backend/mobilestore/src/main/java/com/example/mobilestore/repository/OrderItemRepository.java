package com.example.mobilestore.repository;

import com.example.mobilestore.model.OrderItem;
import com.example.mobilestore.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrder(Order order); // Lấy chi tiết đơn hàng
}
