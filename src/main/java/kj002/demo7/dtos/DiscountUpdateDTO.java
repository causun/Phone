package kj002.demo7.dtos;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.*;
import kj002.demo7.models.DiscountStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;
@Data
public class DiscountUpdateDTO {


    private Long id;

    @NotBlank(message = "Code is required")
    private String code;

    @Min(value = 1, message = "discountPercent must > 0")
    private double discountPercent;

    @NotNull(message = "startDateTime is required")
    private LocalDateTime startDateTime;

    @NotNull(message = "endDateTime is required")
    private LocalDateTime endDateTime;

    @Min(value = 0, message = "quantity must >= 0")
    private int quantity;

    @NotEmpty(message = "productIds must not be empty")
    private Set<Long> productIds;

    // Optional
    private DiscountStatus status;
}
