package com.example.mobilestore.service;

import com.example.mobilestore.model.*;
import com.example.mobilestore.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {
    @Autowired private OrderRepository orderRepository;
    @Autowired private OrderItemRepository orderItemRepository;
    @Autowired private ProductRepository productRepository;

    public Order createOrder(User user, List<OrderItem> items){
        Order order = new Order();
        order.setUser(user);
        order.setCreatedAt(LocalDateTime.now());
        order.setApproved(false);
        order = orderRepository.save(order);

        for(OrderItem item : items){
            item.setOrder(order);
            orderItemRepository.save(item);
            Product p = item.getProduct();
            p.setStock(p.getStock() - item.getQuantity());
            productRepository.save(p);
        }
        return order;
    }

    public List<Order> getOrdersByUser(User user){ return orderRepository.findByUser(user); }

    public List<Order> getAllOrders() {
        return orderRepository.findAll(); // giả sử bạn có OrderRepository extends JpaRepository
    }


    public List<Order> getOrdersToday(){
        LocalDateTime start = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime end = LocalDateTime.now();
        return orderRepository.findByCreatedAtBetween(start, end);
    }

    public Order approveOrder(Long orderId){
        Order o = orderRepository.findById(orderId).orElse(null);
        if(o != null){ o.setApproved(true); return orderRepository.save(o);}
        return null;
    }
}
