package com.example.mobilestore.controller;

import com.example.mobilestore.dto.OrderDTO.*;
import com.example.mobilestore.model.*;
import com.example.mobilestore.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired private OrderService orderService;
    @Autowired private ProductService productService;
    @Autowired private UserService userService;

    @PostMapping("/create/{userId}")
    public Order createOrder(@PathVariable Long userId, @RequestBody OrderRequest request){
        User u = userService.getUserById(userId).orElse(null);
        if(u==null) return null;
        List<OrderItem> items = request.getItems().stream().map(i->{
            OrderItem oi = new OrderItem();
            Product p = productService.getAllActiveProducts().stream()
                    .filter(prod->prod.getId().equals(i.getProductId()))
                    .findFirst().orElse(null);
            oi.setProduct(p);
            oi.setQuantity(i.getQuantity());
            return oi;
        }).collect(Collectors.toList());
        return orderService.createOrder(u, items);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable Long userId){
        User u = userService.getUserById(userId).orElse(null);
        return u==null? List.of() : orderService.getOrdersByUser(u);
    }

    @GetMapping
    public List<Order> getAllOrders(){
        return orderService.getAllOrders(); // cần service trả về tất cả order
    }


    @PostMapping("/approve/{orderId}")
    public Order approveOrder(@PathVariable Long orderId){ return orderService.approveOrder(orderId);}
}
