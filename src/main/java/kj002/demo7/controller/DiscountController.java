package kj002.demo7.controller;

import kj002.demo7.dtos.DiscountCodeDTO;
import kj002.demo7.dtos.DiscountedProductDTO;
import kj002.demo7.models.DiscountCode;
import kj002.demo7.services.DiscountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/discounts")
@CrossOrigin("*")
public class DiscountController {

    private final DiscountService discountService;

    public DiscountController(DiscountService discountService) {
        this.discountService = discountService;
    }

    @GetMapping
    public ResponseEntity<List<DiscountCode>> getAll() {
        return ResponseEntity.ok(discountService.findAll());
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<DiscountCode> getByCode(@PathVariable String code) {
        DiscountCode discount = discountService.findByCode(code);
        if (discount == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(discount);
    }

    @PostMapping
    public ResponseEntity<?> createDiscount(@RequestBody DiscountCodeDTO dto) {
        try {
            DiscountCode created = discountService.createDiscount(dto);
            return ResponseEntity.ok(created);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDiscount(@PathVariable Long id,
                                            @RequestBody DiscountCodeDTO dto) {
        try {
            DiscountCode updated = discountService.updateDiscount(id, dto);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDiscount(@PathVariable Long id) {
        try {
            discountService.deleteById(id);
            return ResponseEntity.ok("Xóa mã giảm giá thành công!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/product/{productId}/price")
    public ResponseEntity<DiscountedProductDTO> getProductPriceWithDiscount(
            @PathVariable Long productId) {

        DiscountedProductDTO dto = discountService.getProductPriceWithDiscount(productId);
        return ResponseEntity.ok(dto);
    }
}
