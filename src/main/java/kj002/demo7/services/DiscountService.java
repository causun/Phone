package kj002.demo7.services;

import kj002.demo7.dtos.DiscountCodeDTO;
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
        List<DiscountCode> list = discountCodeRepository.findAll();
        for (DiscountCode dc : list) {
            validateDiscount(dc);
        }
        return list;
    }
    public DiscountCode validateDiscount(DiscountCode dc) {
        if (dc == null) return null;

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

        discountCodeRepository.save(dc);
        return dc.getStatus() == DiscountStatus.ACTIVE ? dc : null;
    }

    private void autoSetStatus(DiscountCode dc) {
        validateDiscount(dc);
    }
    private void validateProductForDiscount(Product p) {

        // Kiểm tra tồn kho hợp lệ
        if (p.getQuantityInStock() == null || p.getQuantityInStock() <= 0) {
            throw new RuntimeException("Sản phẩm '" + p.getName() + "' hết hàng!");
        }

        // Kiểm tra trạng thái sản phẩm
        if (p.getStatus() == ProductStatus.INACTIVE) {
            throw new RuntimeException("Sản phẩm '" + p.getName() + "' đang INACTIVE!");
        }

        //Kiểm tra mã giảm giá cũ của sản phẩm
        DiscountCode old = p.getDiscountCode();
        if (old != null) {
            validateDiscount(old);
            if (old.getStatus() == DiscountStatus.ACTIVE ||
                    old.getStatus() == DiscountStatus.NOT_STARTED) {

                throw new RuntimeException(
                        "Sản phẩm '" + p.getName() + "' đang có mã giảm giá còn hiệu lực!");
            }
            if (old.getStatus() == DiscountStatus.EXPIRED) {
                p.setDiscountCode(null);
                productRepository.save(p);
            }
        }
    }

    public DiscountCode createDiscount(DiscountCodeDTO dto) {

        if (discountCodeRepository.findByCode(dto.getCode()) != null) {
            throw new RuntimeException("Mã giảm giá đã tồn tại!");
        }

        LocalDateTime now = LocalDateTime.now();

        if (dto.getStartDateTime().isBefore(now)) {
            throw new RuntimeException("StartDate không được ở quá khứ");
        }
        if (dto.getEndDateTime().isBefore(now)) {
            throw new RuntimeException("EndDate không được ở quá khứ");
        }

        if (dto.getStartDateTime().isAfter(dto.getEndDateTime())) {
            throw new RuntimeException("StartDate phải nhỏ hơn EndDate");
        }

        Set<Product> products = new HashSet<>(productRepository.findAllById(dto.getProductIds()));
        if (products.isEmpty()) {
            throw new RuntimeException("Không có sản phẩm hợp lệ!");
        }

        // Check sản phẩm
        for (Product p : products) {
            validateProductForDiscount(p);
        }

        // Check tổng tồn kho
        int totalStock = products.stream()
                .mapToInt(p -> p.getQuantityInStock() == null ? 0 : p.getQuantityInStock())
                .sum();

        if (dto.getQuantity() > totalStock) {
            throw new RuntimeException("Số lượng mã giảm giá không được lớn hơn tổng tồn kho (" + totalStock + ")");
        }

        // Tạo discount
        DiscountCode dc = new DiscountCode();
        dc.setCode(dto.getCode().trim().toUpperCase());
        dc.setDiscountPercent(dto.getDiscountPercent());
        dc.setStartDateTime(dto.getStartDateTime());
        dc.setEndDateTime(dto.getEndDateTime());
        dc.setQuantity(dto.getQuantity());
        dc.setProducts(products);

        autoSetStatus(dc);

        for (Product p : products) {
            p.setDiscountCode(dc);
            productRepository.save(p);
        }

        return discountCodeRepository.save(dc);
    }
    public DiscountCode updateDiscount(DiscountCodeDTO dto) {

        // 1. Lấy ra discount hiện tại
        DiscountCode dc = discountCodeRepository.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy mã giảm giá"));

        LocalDateTime now = LocalDateTime.now();


        if (dto.getStatus() == DiscountStatus.EXPIRED) {
            dc.setCode(dto.getCode().trim().toUpperCase());
            dc.setDiscountPercent(dto.getDiscountPercent());
            dc.setStartDateTime(dto.getStartDateTime());
            dc.setEndDateTime(dto.getEndDateTime());
            dc.setQuantity(dto.getQuantity());

            // Set trạng thái EXPIRED
            dc.setStatus(DiscountStatus.EXPIRED);

            return discountCodeRepository.save(dc);
        }

        // Không cho phép startDate / endDate ở quá khứ
        if (dto.getStartDateTime().isBefore(now)) {
            throw new RuntimeException("StartDate không được ở quá khứ");
        }
        if (dto.getEndDateTime().isBefore(now)) {
            throw new RuntimeException("EndDate không được ở quá khứ");
        }

        // Check start < end
        if (dto.getStartDateTime().isAfter(dto.getEndDateTime())) {
            throw new RuntimeException("StartDate phải nhỏ hơn EndDate");
        }

        // Load danh sách sản phẩm mới
        Set<Product> newProducts = new HashSet<>(productRepository.findAllById(dto.getProductIds()));
        if (newProducts.isEmpty()) {
            throw new RuntimeException("Danh sách sản phẩm không hợp lệ");
        }

        // Check từng product: tồn kho, ACTIVE, không có discount khác còn hiệu lực
        for (Product p : newProducts) {
            validateProductForDiscount(p);
        }

        // Check tổng tồn kho
        int totalStock = newProducts.stream()
                .mapToInt(p -> p.getQuantityInStock() == null ? 0 : p.getQuantityInStock())
                .sum();

        if (dto.getQuantity() > totalStock) {
            throw new RuntimeException("Số lượng mã giảm giá (" + dto.getQuantity()
                    + ") không được lớn hơn tổng tồn kho (" + totalStock + ")");
        }

        // Gỡ discount khỏi các sản phẩm cũ không còn trong danh sách mới
        Set<Product> oldProducts = dc.getProducts();
        for (Product oldP : oldProducts) {
            if (!newProducts.contains(oldP)) {
                oldP.setDiscountCode(null);
                productRepository.save(oldP);
            }
        }

        // Cập nhật thông tin DiscountCode
        dc.setCode(dto.getCode().trim().toUpperCase());
        dc.setDiscountPercent(dto.getDiscountPercent());
        dc.setStartDateTime(dto.getStartDateTime());
        dc.setEndDateTime(dto.getEndDateTime());
        dc.setQuantity(dto.getQuantity());
        dc.setProducts(newProducts);

        // Tự set lại status theo thời gian + quantity
        autoSetStatus(dc);

        // Gán lại discount cho các sản phẩm mới
        for (Product p : newProducts) {
            p.setDiscountCode(dc);
            productRepository.save(p);
        }

        return discountCodeRepository.save(dc);
    }


    public DiscountCode getDiscountById(Long id) {

        DiscountCode dc = discountCodeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy mã giảm giá"));

        validateDiscount(dc);

        List<Product> productList = productRepository.findByDiscountCode(dc);
        dc.setProducts(new HashSet<>(productList));

        return dc;
    }
}
