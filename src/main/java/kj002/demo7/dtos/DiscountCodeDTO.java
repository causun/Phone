package kj002.demo7.dtos;

import kj002.demo7.models.DiscountStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DiscountCodeDTO {

    private Long id;

    private String code;

    private double discountPercent;

    // Thay LocalDate -> LocalDateTime để quản lý giờ phút giây
    private LocalDateTime startDate;

    private LocalDateTime endDate;

    // Trạng thái: ACTIVE, UPCOMING, EXPIRED
    private DiscountStatus status = DiscountStatus.ACTIVE;

    // Danh sách ID sản phẩm được áp mã giảm giá
    private Set<Long> productIds;
}
