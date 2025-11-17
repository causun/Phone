package kj002.demo7.dtos;

import kj002.demo7.models.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private String brand;

    private String name;

    private double price;

    private int quantityInStock;

    private String screenSize;
    private String ram;
    private String storage;
    private String chipset;
    private String camera;
    private String battery;
    private String os;
    private String color;

    private String description;

    private ProductStatus status;
    private LocalDateTime createdAt;


    private List<MultipartFile> images;

    // Danh sách ID mã giảm giá áp dụng cho sản phẩm này
    private Set<Long> discountIds;
}

