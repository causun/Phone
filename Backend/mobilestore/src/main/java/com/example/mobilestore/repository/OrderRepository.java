package com.example.mobilestore.repository;

import com.example.mobilestore.model.Order;
import com.example.mobilestore.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user); // Lấy lịch sử đơn của user
    List<Order> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end); // Lấy đơn trong khoảng ngày
}
