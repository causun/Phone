package kj002.tripplaner.services;

import kj002.tripplaner.dtos.CompareResultDTO;
import kj002.tripplaner.dtos.ProductDetailDTO;
import kj002.tripplaner.models.Product;
import kj002.tripplaner.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompareService {

    private final ProductRepository productRepository;
    private final ModelMapper mapper;
    private final AIService aiService;
    private final ProductService productService;

    public CompareResultDTO compare(Long id1, Long id2) throws Exception {

        Product prod1 = productRepository.findById(id1)
                .orElseThrow(() -> new RuntimeException("Sản phẩm 1 không tồn tại"));

        Product prod2 = productRepository.findById(id2)
                .orElseThrow(() -> new RuntimeException("Sản phẩm 2 không tồn tại"));

        ProductDetailDTO p1 = productService.toDetailDTO(prod1);
        ProductDetailDTO p2 = productService.toDetailDTO(prod2);


        String info1 = convertToInfo(p1);
        String info2 = convertToInfo(p2);

        // Gọi AI để phân tích
        String aiConclusion = aiService.generateConclusion(info1, info2);

        CompareResultDTO result = new CompareResultDTO();
        result.setP1(p1);
        result.setP2(p2);
        result.setAiConclusion(aiConclusion);

        return result;
    }

    private String convertToInfo(ProductDetailDTO p) {
        return """
            Tên: %s
            Giá: %s
            RAM: %s
            Bộ nhớ: %s
            Chipset: %s
            Camera: %s
            Pin: %s
            Màn hình: %s
            Mô tả: %s
            """.formatted(
                p.getName(),
                p.getPrice(),
                p.getRam(),
                p.getStorage(),
                p.getChipset(),
                p.getCamera(),
                p.getBattery(),
                p.getScreenSize(),
                p.getDescription()
        );
    }
}
