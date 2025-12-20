package kj002.tripplaner.dtos;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import kj002.tripplaner.models.ProductStatus;
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
public class ProductCreateDTO {

    @NotNull(message = "Brand is required")
    private Long brandId;

    @NotBlank(message = "Name is required")
    private String name;

    @Positive(message = "Price must be > 0")
    private double price;

    @Min(value = 0, message = "Quantity must be >= 0")
    private int quantityInStock;

    private String screenSize;
    private String ram;
    private String storage;
    private String chipset;
    private String camera;
    private String battery;
    private String os;
    private String color;

    @NotBlank(message = "Description is required")
    private String description;

    private ProductStatus status;

    private List<MultipartFile> images;
}

