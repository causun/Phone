package kj002.demo7.services;

import kj002.demo7.dtos.DiscountCodeDTO;
import kj002.demo7.dtos.DiscountedProductDTO;
import kj002.demo7.models.DiscountCode;
import kj002.demo7.models.DiscountStatus;
import kj002.demo7.models.Product;
import kj002.demo7.repositories.DiscountCodeRepository;
import kj002.demo7.repositories.ProductRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class DiscountService {

    private final DiscountCodeRepository discountCodeRepository;
    private final ProductRepository productRepository;

    public DiscountService(DiscountCodeRepository discountCodeRepository,
                           ProductRepository productRepository) {
        this.discountCodeRepository = discountCodeRepository;
        this.productRepository = productRepository;
    }

    public DiscountCode findByCode(String code) {
        return discountCodeRepository.findByCode(code);
    }

    // ==========================
    // Validate start/end datetime
    // ==========================
    private void validateDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        if (startDate == null || endDate == null)
            throw new IllegalArgumentException("Ngày bắt đầu và kết thúc không được để trống!");
        if (endDate.isBefore(startDate))
            throw new IllegalArgumentException("Ngày kết thúc phải sau ngày bắt đầu!");
    }

    // ==========================
    // Tính trạng thái discount
    // ==========================
    private DiscountStatus calculateStatus(LocalDateTime startDate, LocalDateTime endDate) {
        LocalDateTime now = LocalDateTime.now();

        if (now.isBefore(startDate)) return DiscountStatus.UPCOMING;
        if (now.isAfter(endDate)) return DiscountStatus.EXPIRED;
        return DiscountStatus.ACTIVE;
    }

    // ==========================
    // Tạo discount
    // ==========================
    public DiscountCode createDiscount(DiscountCodeDTO dto) {
        validateDateRange(dto.getStartDate(), dto.getEndDate());

        DiscountCode discount = new DiscountCode();
        discount.setCode(dto.getCode());
        discount.setDiscountPercent(dto.getDiscountPercent());
        discount.setStartDate(dto.getStartDate());
        discount.setEndDate(dto.getEndDate());
        discount.setStatus(calculateStatus(dto.getStartDate(), dto.getEndDate()));

        // Kiểm tra mỗi sản phẩm chỉ có 1 mã ACTIVE/UPCOMING
        if (dto.getProductIds() != null && !dto.getProductIds().isEmpty()) {
            Set<Product> products = new HashSet<>(productRepository.findAllById(dto.getProductIds()));
            for (Product p : products) {
                Set<DiscountCode> activeDiscounts = new HashSet<>();
                if (p.getDiscountCodes() != null) {
                    for (DiscountCode dc : p.getDiscountCodes()) {
                        if (dc.getStatus() != DiscountStatus.EXPIRED) {
                            activeDiscounts.add(dc);
                        }
                    }
                }
                if (!activeDiscounts.isEmpty()) {
                    throw new RuntimeException(
                            "Sản phẩm '" + p.getName() + "' đã có mã giảm giá ACTIVE hoặc UPCOMING!"
                    );
                }
            }
            discount.setProducts(products);
        }

        return discountCodeRepository.save(discount);
    }

    // ==========================
    // Lấy tất cả discount + auto update trạng thái
    // ==========================
    public List<DiscountCode> findAll() {
        List<DiscountCode> discounts = discountCodeRepository.findAll();
        for (DiscountCode discount : discounts) {
            DiscountStatus newStatus = calculateStatus(discount.getStartDate(), discount.getEndDate());
            if (discount.getStatus() != newStatus) {
                discount.setStatus(newStatus);
                discountCodeRepository.save(discount);
            }
        }
        return discounts;
    }

    // ==========================
    // Update discount
    // ==========================
    public DiscountCode updateDiscount(Long id, DiscountCodeDTO dto) {
        DiscountCode existing = discountCodeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy mã giảm giá ID: " + id));

        validateDateRange(dto.getStartDate(), dto.getEndDate());

        existing.setCode(dto.getCode());
        existing.setDiscountPercent(dto.getDiscountPercent());
        existing.setStartDate(dto.getStartDate());
        existing.setEndDate(dto.getEndDate());
        existing.setStatus(calculateStatus(dto.getStartDate(), dto.getEndDate()));

        if (dto.getProductIds() != null) {
            Set<Product> products = new HashSet<>(productRepository.findAllById(dto.getProductIds()));
            for (Product p : products) {
                Set<DiscountCode> activeDiscounts = new HashSet<>();
                if (p.getDiscountCodes() != null) {
                    for (DiscountCode dc : p.getDiscountCodes()) {
                        if (dc.getStatus() != DiscountStatus.EXPIRED && !dc.getId().equals(id)) {
                            activeDiscounts.add(dc);
                        }
                    }
                }
                if (!activeDiscounts.isEmpty()) {
                    throw new RuntimeException(
                            "Sản phẩm '" + p.getName() + "' đã có mã giảm giá ACTIVE hoặc UPCOMING!"
                    );
                }
            }
            existing.setProducts(products);
        }

        return discountCodeRepository.save(existing);
    }

    // ==========================
    // Delete discount
    // ==========================
    public void deleteById(Long id) {
        DiscountCode discount = discountCodeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy mã giảm giá"));

        for (Product p : discount.getProducts()) {
            p.getDiscountCodes().remove(discount);
            productRepository.save(p);
        }

        discountCodeRepository.delete(discount);
    }

    // ==========================
    // Lấy giá gốc + giá sau giảm cho 1 sản phẩm
    // ==========================
    public DiscountedProductDTO getProductPriceWithDiscount(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

        double originalPrice = product.getPrice();
        double discountedPrice = originalPrice;

        DiscountCode applied = null;
        if (product.getDiscountCodes() != null && !product.getDiscountCodes().isEmpty()) {
            applied = product.getDiscountCodes().get(0);
            discountedPrice = originalPrice - (originalPrice * applied.getDiscountPercent() / 100);
        }

        return new DiscountedProductDTO(
                product.getId(),
                product.getName(),
                originalPrice,
                discountedPrice,
                applied != null ? applied.getDiscountPercent() : 0,
                applied != null ? applied.getCode() : null
        );
    }

    // ==========================
    // Cron job tự động check mã hết hạn
    // ==========================
    @Scheduled(cron = "0 0 0 * * ?")
    public void autoUpdateDiscountStatus() {
        List<DiscountCode> discounts = discountCodeRepository.findAll();

        for (DiscountCode discount : discounts) {
            DiscountStatus newStatus = calculateStatus(discount.getStartDate(), discount.getEndDate());

            if (newStatus == DiscountStatus.EXPIRED) {
                for (Product p : new HashSet<>(discount.getProducts())) {
                    p.getDiscountCodes().remove(discount);
                    productRepository.save(p);
                }
                discount.getProducts().clear();
            }

            if (discount.getStatus() != newStatus) {
                discount.setStatus(newStatus);
                discountCodeRepository.save(discount);
            }
        }

        System.out.println("Discount status auto-updated at: " + LocalDateTime.now());
    }
}
