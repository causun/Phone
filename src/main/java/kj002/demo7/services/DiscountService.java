package kj002.demo7.services;

import kj002.demo7.dtos.DiscountCodeDTO;
import kj002.demo7.dtos.DiscountUpdateDTO;
import kj002.demo7.models.*;
import kj002.demo7.repositories.DiscountCodeRepository;
import kj002.demo7.repositories.ProductRepository;
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
    public List<DiscountCode> findAll() {
        return discountCodeRepository.findAll();
    }
    public DiscountCode validateDiscount(DiscountCode dc) {

        if (dc == null) return null;

        LocalDateTime now = LocalDateTime.now();

        if (now.isAfter(dc.getEndDateTime())) {
            dc.setStatus(DiscountStatus.EXPIRED);
            discountCodeRepository.save(dc);
            return null;
        }

        if (now.isBefore(dc.getStartDateTime())) {
            dc.setStatus(DiscountStatus.NOT_STARTED);
            discountCodeRepository.save(dc);
            return null;
        }

        if (dc.getQuantity() <= 0) {
            dc.setStatus(DiscountStatus.OUT_OF_STOCK);
            discountCodeRepository.save(dc);
            return null;
        }

        dc.setStatus(DiscountStatus.ACTIVE);
        discountCodeRepository.save(dc);

        return dc;
    }


    // Validate mã
    private DiscountCode validate(DiscountCode dc) {

        LocalDateTime now = LocalDateTime.now();

        if (now.isAfter(dc.getEndDateTime())) {
            dc.setStatus(DiscountStatus.EXPIRED);
            discountCodeRepository.save(dc);
            return null;
        }

        if (now.isBefore(dc.getStartDateTime())) {
            dc.setStatus(DiscountStatus.NOT_STARTED);
            discountCodeRepository.save(dc);
            return null;
        }

        if (dc.getQuantity() <= 0) {
            dc.setStatus(DiscountStatus.OUT_OF_STOCK);
            discountCodeRepository.save(dc);
            return null;
        }

        dc.setStatus(DiscountStatus.ACTIVE);
        discountCodeRepository.save(dc);
        return dc;
    }

    public DiscountCode createDiscount(DiscountCodeDTO dto) {

        // Check mã tồn tại
        if (discountCodeRepository.findByCode(dto.getCode()) != null) {
            throw new RuntimeException("Mã giảm giá đã tồn tại!");
        }

        // Check thời gian hợp lệ
        if (dto.getStartDateTime().isAfter(dto.getEndDateTime())) {
            throw new RuntimeException("StartDate phải nhỏ hơn EndDate");
        }

        // Lấy danh sách sản phẩm
        Set<Product> products = new HashSet<>(productRepository.findAllById(dto.getProductIds()));

        if (products.isEmpty()) {
            throw new RuntimeException("Không có sản phẩm hợp lệ!");
        }

        // KIỂM TRA MÃ GIẢM GIÁ CŨ CỦA SẢN PHẨM
        for (Product p : products) {

            DiscountCode old = p.getDiscountCode();

            if (old != null) {
                DiscountStatus status = old.getStatus();

                boolean stillActive =
                        status == DiscountStatus.ACTIVE ||
                                status == DiscountStatus.NOT_STARTED ||
                                status == DiscountStatus.OUT_OF_STOCK;

                if (stillActive) {
                    throw new RuntimeException(
                            "Sản phẩm '" + p.getName() + "' đang có mã giảm giá còn hiệu lực!");
                }

                // Nếu mã cũ EXPIRED → tự động gỡ
                if (status == DiscountStatus.EXPIRED) {
                    p.setDiscountCode(null);
                    productRepository.save(p); // save detach
                }
            }
        }

        // TẠO MÃ GIẢM GIÁ MỚI
        DiscountCode dc = new DiscountCode();
        dc.setCode(dto.getCode().trim().toUpperCase());
        dc.setDiscountPercent(dto.getDiscountPercent());
        dc.setStartDateTime(dto.getStartDateTime());
        dc.setEndDateTime(dto.getEndDateTime());
        dc.setQuantity(dto.getQuantity());
        dc.setStatus(DiscountStatus.ACTIVE);

        // Gán mã mới cho sản phẩm
        for (Product p : products) {
            p.setDiscountCode(dc);
        }

        dc.setProducts(products);

        return discountCodeRepository.save(dc);
    }

    public DiscountCode updateDiscount(DiscountUpdateDTO dto) {

        // 1. Lấy discount hiện có
        DiscountCode dc = discountCodeRepository.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy mã giảm giá"));

        // 2. Validate ngày
        if (dto.getStartDateTime().isAfter(dto.getEndDateTime())) {
            throw new RuntimeException("StartDate phải nhỏ hơn EndDate");
        }

        // 3. Lấy danh sách sản phẩm mới
        Set<Product> newProducts = new HashSet<>();
        if (dto.getProductIds() != null && !dto.getProductIds().isEmpty()) {
            newProducts.addAll(productRepository.findAllById(dto.getProductIds()));

            if (newProducts.isEmpty()) {
                throw new RuntimeException("Danh sách sản phẩm không hợp lệ");
            }
        } else {
            // Nếu không gửi productIds thì giữ nguyên các sản phẩm cũ
            newProducts = dc.getProducts() != null
                    ? new HashSet<>(dc.getProducts())
                    : new HashSet<>();
        }

        // 4. Gỡ mã giảm giá khỏi sản phẩm cũ (nếu không còn trong newProducts)
        Set<Product> oldProducts = dc.getProducts() != null ? dc.getProducts() : new HashSet<>();

        for (Product oldP : oldProducts) {
            if (!newProducts.contains(oldP)) {
                oldP.setDiscountCode(null);
                productRepository.save(oldP);
            }
        }

        // 5. Kiểm tra sản phẩm mới có mã giảm giá khác còn hiệu lực không
        for (Product p : newProducts) {
            DiscountCode other = p.getDiscountCode();

            if (other != null && !other.getId().equals(dc.getId())) {

                DiscountStatus st = other.getStatus();

                boolean stillActive =
                        st == DiscountStatus.ACTIVE ||
                                st == DiscountStatus.NOT_STARTED ||
                                st == DiscountStatus.OUT_OF_STOCK;

                if (stillActive) {
                    throw new RuntimeException(
                            "Sản phẩm '" + p.getName() + "' đang có mã giảm giá khác!");
                }

                // Nếu mã cũ đã EXPIRED → tự động gỡ
                if (st == DiscountStatus.EXPIRED) {
                    p.setDiscountCode(null);
                    productRepository.save(p);
                }
            }
        }

        // 6. Update fields của DiscountCode
        dc.setCode(dto.getCode().trim().toUpperCase());
        dc.setDiscountPercent(dto.getDiscountPercent());
        dc.setStartDateTime(dto.getStartDateTime());
        dc.setEndDateTime(dto.getEndDateTime());
        dc.setQuantity(dto.getQuantity());
        dc.setProducts(newProducts);

        // 7. Update STATUS
        if (dto.getStatus() != null) {
            // User truyền status → dùng trực tiếp
            dc.setStatus(dto.getStatus());
        } else {
            // Không truyền → tự tính
            LocalDateTime now = LocalDateTime.now();

            if (dc.getQuantity() <= 0) {
                dc.setStatus(DiscountStatus.OUT_OF_STOCK);
            } else if (now.isAfter(dc.getEndDateTime())) {
                dc.setStatus(DiscountStatus.EXPIRED);
            } else if (now.isBefore(dc.getStartDateTime())) {
                dc.setStatus(DiscountStatus.NOT_STARTED);
            } else {
                dc.setStatus(DiscountStatus.ACTIVE);
            }
        }
        // 8. Gán lại discount cho các sản phẩm mới
        for (Product p : newProducts) {
            p.setDiscountCode(dc);
            productRepository.save(p);
        }

        // 9. Lưu vào DB
        return discountCodeRepository.save(dc);
    }
    public DiscountCode getDiscountById(Long id) {

        DiscountCode dc = discountCodeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy mã giảm giá với ID: " + id));

        // Validate trạng thái trước khi trả về
        validateDiscount(dc);

        // Lấy danh sách sản phẩm đầy đủ gắn với mã giảm giá
        List<Product> productList = productRepository.findByDiscountCode(dc);

        // Convert List -> Set
        dc.setProducts(new HashSet<>(productList));

        return dc;
    }

}
