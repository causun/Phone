package kj002.demo7.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DiscountedProductDTO {
    private Long productId;
    private String productName;

    private double originalPrice;     // Giá gốc
    private double discountedPrice;   // Giá sau giảm
    private double discountPercent;   // % giảm
    private String discountCode;
}
