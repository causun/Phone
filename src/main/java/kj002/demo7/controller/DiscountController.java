package kj002.demo7.controller;

import jakarta.validation.Valid;
import kj002.demo7.dtos.DiscountCodeDTO;
import kj002.demo7.dtos.DiscountUpdateDTO;
import kj002.demo7.helpers.ApiResponse;
import kj002.demo7.models.DiscountCode;
import kj002.demo7.models.Product;
import kj002.demo7.services.DiscountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/discounts")
public class DiscountController {

    private final DiscountService discountService;

    public DiscountController(DiscountService discountService) {
        this.discountService = discountService;
    }

    // GET ALL DISCOUNT CODES
    @GetMapping
    public ResponseEntity<?> getAllDiscounts() {
        try {
            List<DiscountCode> list = discountService.findAll();

            if (list.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.notfound("Không có mã giảm giá nào"));
            }

            return ResponseEntity.ok(
                    ApiResponse.success(list, "Lấy danh sách mã giảm giá thành công")
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
            return ResponseEntity.ok(ApiResponse.success(dc, "Get discount successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.notfound(e.getMessage()));
        }
    }


    // CREATE DISCOUNT
    @PostMapping
    public ResponseEntity<?> createDiscount(
            @Valid @RequestBody DiscountCodeDTO dto,
            BindingResult bindingResult
    ) {
        try {
            if (bindingResult.hasErrors()) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.badRequest(bindingResult));
            }

            DiscountCode created = discountService.createDiscount(dto);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.created(created, "Tạo mã giảm giá thành công"));

        } catch (RuntimeException e) {
            return ResponseEntity.ok(
                    ApiResponse.success("apply discount successfully", "Discount applied")
            );


        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.errorServer(e.getMessage()));
        }
    }

    // UPDATE DISCOUNT
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDiscount(
            @PathVariable Long id,
            @Valid @RequestBody DiscountUpdateDTO dto,
            BindingResult bindingResult
    ) {
        try {
            if (bindingResult.hasErrors()) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.badRequest(bindingResult));
            }

            dto.setId(id);

            DiscountCode updated = discountService.updateDiscount(dto);

            return ResponseEntity.ok(
                    ApiResponse.success(updated, "Cập nhật mã giảm giá thành công")
            );

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.notfound(e.getMessage()));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.errorServer(e.getMessage()));
        }
    }

    // GET PRODUCT FINAL PRICE (AFTER DISCOUNT)
//    @GetMapping("/product/{productId}")
//    public ResponseEntity<?> getFinalPrice(@PathVariable Long productId) {
//        try {
//            Product p = discountService.getFinalPrice(productId);
//
//
//            return ResponseEntity.ok(
//                    ApiResponse.success(p, "Lấy giá cuối cùng thành công")
//            );
//
//        } catch (RuntimeException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                    .body(ApiResponse.notfound(e.getMessage()));
//
//        } catch (Exception e) {
//            return ResponseEntity.internalServerError()
//                    .body(ApiResponse.errorServer(e.getMessage()));
//        }
//    }

    // USE DISCOUNT FOR PRODUCT
//    @PostMapping("/use/{productId}")
//    public ResponseEntity<?> useDiscount(@PathVariable Long productId) {
//        try {
//            discountService.useDiscount(productId);
//
//            return ResponseEntity.ok(
//                    ApiResponse.success("Discount applied", "Áp dụng mã giảm giá thành công")
//            );
//
//        } catch (RuntimeException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                    .body(ApiResponse.notfound(e.getMessage()));
//
//        } catch (Exception e) {
//            return ResponseEntity.internalServerError()
//                    .body(ApiResponse.errorServer(e.getMessage()));
//        }
//    }
}
