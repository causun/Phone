package kj002.tripplaner.dtos;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderResponse {
    private Long id;
    private String fullName;
    private String phone;
    private String address;
    private Double totalPrice;
    private String status;
    private LocalDateTime createdAt;

    private List<OrderItemResponse> items;
}
