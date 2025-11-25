package kj002.demo7.controller;

import jakarta.validation.Valid;
import kj002.demo7.dtos.DiscountCodeDTO;
import kj002.demo7.helpers.ApiResponse;
import kj002.demo7.models.DiscountCode;
import kj002.demo7.services.DiscountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/discounts")
public class DiscountController {

    private final DiscountService discountService;

    public DiscountController(DiscountService discountService) {
        this.discountService = discountService;
    }
    @GetMapping
    public ResponseEntity<?> getAllDiscounts() {
        try {
            return ResponseEntity.ok(
                    ApiResponse.success(discountService.findAll(),
                            "Lấy danh sách mã giảm giá thành công")
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.errorServer(e.getMessage()));
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getDiscountById(@PathVariable Long id) {
        try {
            DiscountCode dc = discountService.getDiscountById(id);

            // Convert Entity → DTO trả cho FE
            DiscountCodeDTO dto = new DiscountCodeDTO();
            dto.setId(dc.getId());
            dto.setCode(dc.getCode());
            dto.setDiscountPercent(dc.getDiscountPercent());
            dto.setStartDateTime(dc.getStartDateTime());
            dto.setEndDateTime(dc.getEndDateTime());
            dto.setQuantity(dc.getQuantity());
            dto.setStatus(dc.getStatus());
            dto.setProductIds(
                    dc.getProducts().stream().map(p -> p.getId()).toList()
            );

            return ResponseEntity.ok(ApiResponse.success(dto, "Lấy mã giảm giá thành công"));

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.notfound(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.errorServer(e.getMessage()));
        }
    }
    @PostMapping
    public ResponseEntity<?> createDiscount(
            @Valid @RequestBody DiscountCodeDTO dto,
            BindingResult bindingResult) {

        try {
            if (bindingResult.hasErrors()) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.badRequest(bindingResult));
            }

            DiscountCode created = discountService.createDiscount(dto);

            // Convert Entity → DTO response
            DiscountCodeDTO resp = new DiscountCodeDTO();
            resp.setId(created.getId());
            resp.setCode(created.getCode());
            resp.setDiscountPercent(created.getDiscountPercent());
            resp.setStartDateTime(created.getStartDateTime());
            resp.setEndDateTime(created.getEndDateTime());
            resp.setQuantity(created.getQuantity());
            resp.setStatus(created.getStatus());
            resp.setProductIds(
                    created.getProducts().stream().map(p -> p.getId()).toList()
            );

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.created(resp, "Tạo mã giảm giá thành công"));

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.badRequest(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.errorServer(e.getMessage()));
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDiscount(
            @PathVariable Long id,
            @Valid @RequestBody DiscountCodeDTO dto,
            BindingResult bindingResult) {

        try {
            if (bindingResult.hasErrors()) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.badRequest(bindingResult));
            }

            dto.setId(id);

            DiscountCode updated = discountService.updateDiscount(dto);

            // Convert Entity → DTO response
            DiscountCodeDTO resp = new DiscountCodeDTO();
            resp.setId(updated.getId());
            resp.setCode(updated.getCode());
            resp.setDiscountPercent(updated.getDiscountPercent());
            resp.setStartDateTime(updated.getStartDateTime());
            resp.setEndDateTime(updated.getEndDateTime());
            resp.setQuantity(updated.getQuantity());
            resp.setStatus(updated.getStatus());
            resp.setProductIds(
                    updated.getProducts().stream().map(p -> p.getId()).toList()
            );

            return ResponseEntity.ok(
                    ApiResponse.success(resp, "Cập nhật mã giảm giá thành công")
            );

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.badRequest(e.getMessage()));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.errorServer(e.getMessage()));
        }
    }
}
