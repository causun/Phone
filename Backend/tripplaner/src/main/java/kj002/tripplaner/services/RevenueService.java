package kj002.tripplaner.services;

import kj002.tripplaner.dtos.RevenueResponse;
import kj002.tripplaner.models.OrderStatus;
import kj002.tripplaner.repositories.OrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class RevenueService {

    private final OrderRepository orderRepository;

    public RevenueService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public RevenueResponse getRevenue(LocalDate fromDate, LocalDate toDate) {

        LocalDateTime from = fromDate.atStartOfDay();
        LocalDateTime to = toDate.atTime(23, 59, 59);

        Double revenue = orderRepository.sumRevenueBetween(
                OrderStatus.COMPLETED,
                from,
                to
        );

        Long totalOrders = orderRepository.countByStatusAndCreatedAtBetween(
                OrderStatus.COMPLETED,
                from,
                to
        );

        return new RevenueResponse(revenue, totalOrders);
    }
    public RevenueResponse getTodayRevenue() {
        LocalDate today = LocalDate.now();
        return getRevenue(today, today);
    }

    public RevenueResponse getCurrentMonthRevenue() {
        LocalDate now = LocalDate.now();
        LocalDate firstDay = now.withDayOfMonth(1);
        LocalDate lastDay = now.withDayOfMonth(now.lengthOfMonth());
        return getRevenue(firstDay, lastDay);
    }

}
