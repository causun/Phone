package kj002.demo7.dtos;

import kj002.demo7.models.DiscountStatus;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
public class DiscountCodeDTO {
private Long id;
    private String code;
    private double discountPercent;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private int quantity;
    private DiscountStatus status;

    private List<Long> productIds; // danh sách sản phẩm áp dụng
}

