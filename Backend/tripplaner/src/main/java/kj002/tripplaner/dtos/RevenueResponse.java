package kj002.tripplaner.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RevenueResponse {
    private Double totalRevenue;
    private Long totalOrders;
}
