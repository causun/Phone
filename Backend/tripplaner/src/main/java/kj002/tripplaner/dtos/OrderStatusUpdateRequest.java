package kj002.tripplaner.dtos;

import kj002.tripplaner.models.OrderStatus;
import lombok.Data;

@Data
public class OrderStatusUpdateRequest {
    private OrderStatus status;
}
