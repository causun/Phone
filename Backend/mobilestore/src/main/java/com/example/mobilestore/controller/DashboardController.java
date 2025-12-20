package com.example.mobilestore.controller;

import com.example.mobilestore.model.Order;
import com.example.mobilestore.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class DashboardController {

    private final OrderService orderService;

    public DashboardController(OrderService orderService) {
        this.orderService = orderService;
    }

    /**
     * Trả KPI stats
     * GET /api/stats?range=today/week/month
     */
    @GetMapping("/stats")
    public Map<String, Object> getStats(@RequestParam(defaultValue = "today") String range) {
        List<Order> orders = filterOrdersByRange(orderService.getAllOrders(), range);

        int totalOrders = orders.size();
        double totalRevenue = orders.stream()
                .mapToDouble(o -> o.getItems().stream().mapToDouble(i -> i.getPrice() * i.getQuantity()).sum())
                .sum();

        long totalCustomers = orders.stream()
                .map(Order::getUserId) // dùng getUserId()
                .distinct()
                .count();

        double avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        Map<String, Object> stats = new HashMap<>();
        stats.put("orders", totalOrders);
        stats.put("ordersChange", 0);
        stats.put("revenue", totalRevenue);
        stats.put("revenueChange", 0);
        stats.put("customers", totalCustomers);
        stats.put("customersChange", 0);
        stats.put("avgOrderValue", avgOrderValue);
        stats.put("avgOrderValueChange", 0);

        return stats;
    }

    /**
     * Trả dữ liệu chart
     * GET /api/chart?range=today/week/month
     */
    @GetMapping("/chart")
    public List<Map<String, Object>> getChart(@RequestParam(defaultValue = "today") String range) {
        List<Order> orders = filterOrdersByRange(orderService.getAllOrders(), range);
        Map<String, List<Order>> grouped = new TreeMap<>();

        DateTimeFormatter formatter;
        switch (range) {
            case "week":
                formatter = DateTimeFormatter.ofPattern("EEE"); // Mon, Tue...
                break;
            case "month":
                formatter = DateTimeFormatter.ofPattern("dd/MM");
                break;
            default:
                formatter = DateTimeFormatter.ofPattern("HH:mm");
        }

        for (Order o : orders) {
            String key = o.getCreatedAt().format(formatter); // dùng getCreatedAt()
            grouped.computeIfAbsent(key, k -> new ArrayList<>()).add(o);
        }

        List<Map<String, Object>> chart = new ArrayList<>();
        for (Map.Entry<String, List<Order>> entry : grouped.entrySet()) {
            Map<String, Object> data = new HashMap<>();
            data.put("time", entry.getKey());
            data.put("orders", entry.getValue().size());
            double revenue = entry.getValue().stream()
                    .mapToDouble(order -> order.getItems().stream().mapToDouble(i -> i.getPrice() * i.getQuantity()).sum())
                    .sum();
            data.put("revenue", revenue);
            chart.add(data);
        }

        return chart;
    }

    /**
     * Lọc orders theo khoảng thời gian
     */
    private List<Order> filterOrdersByRange(List<Order> orders, String range) {
        LocalDate now = LocalDate.now();
        switch (range) {
            case "today":
                return orders.stream()
                        .filter(o -> o.getCreatedAt().toLocalDate().isEqual(now))
                        .collect(Collectors.toList());
            case "week":
                LocalDate startWeek = now.minusDays(6);
                return orders.stream()
                        .filter(o -> !o.getCreatedAt().toLocalDate().isBefore(startWeek))
                        .collect(Collectors.toList());
            case "month":
                LocalDate startMonth = now.withDayOfMonth(1);
                return orders.stream()
                        .filter(o -> !o.getCreatedAt().toLocalDate().isBefore(startMonth))
                        .collect(Collectors.toList());
            default:
                return orders;
        }
    }
}
