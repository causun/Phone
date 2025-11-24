package kj002.demo7.dtos;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.Set;

@Data
public class DiscountCodeDTO {

    private String code;
    private double discountPercent;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private int quantity;

    // danh sách ID sản phẩm áp dụng
    private Set<Long> productIds;
}

