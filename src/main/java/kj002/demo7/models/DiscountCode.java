package kj002.demo7.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "discount_codes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DiscountCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code;

    private double discountPercent;

    private LocalDateTime startDateTime;

    private LocalDateTime endDateTime;

    private int quantity;

    @Enumerated(EnumType.STRING)
    private DiscountStatus status = DiscountStatus.ACTIVE;

    // 1 mã giảm giá → N sản phẩm
    @OneToMany(mappedBy = "discountCode", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Product> products = new HashSet<>();
}
