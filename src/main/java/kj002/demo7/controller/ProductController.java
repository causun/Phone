package kj002.demo7.controller;

import jakarta.validation.Valid;
import kj002.demo7.dtos.ProductDTO;
import kj002.demo7.dtos.ProductUpdateDTO;
import kj002.demo7.helpers.ApiResponse;
import kj002.demo7.models.Product;
import kj002.demo7.services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<?> getAllProducts() {
        try {
            List<Product> list = productService.findAllWithFinalPrice();
            return ResponseEntity.ok(ApiResponse.success(list, "Get product list successfully"));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.errorServer(e.getMessage()));
        }
    }
    @PostMapping
    public ResponseEntity<?> addProduct(
            @Valid @ModelAttribute ProductDTO productDTO,
            BindingResult bindingResult) {

        try {
            // Validate ảnh bắt buộc
            if (productDTO.getImages() == null || productDTO.getImages().isEmpty()) {
                bindingResult.rejectValue("images", "400", "Images are required");
            }

            if (bindingResult.hasErrors()) {
                return ResponseEntity.badRequest().body(ApiResponse.badRequest(bindingResult));
            }

            Product created = productService.create(productDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.created(created, "Add product successfully"));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.errorServer(e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProduct(@PathVariable Long id) {
        try {
            Product product = productService.getProductById(id);
            return ResponseEntity.ok(ApiResponse.success(product, "Get product successfully"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.notfound(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        try {
            Optional<Product> productExisting = productService.findById(id);

            if (productExisting.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.notfound("Product not found"));
            }

            productService.delete(productExisting.get());

            return ResponseEntity.ok(ApiResponse.success(null, "Delete product successfully"));

        } catch (IOException e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.errorServer(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable Long id,
            @Valid @ModelAttribute ProductUpdateDTO productUpdateDTO,
            BindingResult bindingResult) {

        try {
            Optional<Product> productExisting = productService.findById(id);
            if (productExisting.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.notfound("Product not found"));
            }

            if (bindingResult.hasErrors()) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.badRequest(bindingResult));
            }

            productUpdateDTO.setId(id);

            Product updated = productService.update(productUpdateDTO);

            return ResponseEntity.ok(ApiResponse.success(updated, "Update product successfully"));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.errorServer(e.getMessage()));
        }
    }

    @GetMapping("/search/{keyword}")
    public ResponseEntity<?> searchProducts(@PathVariable String keyword) {
        try {
            List<Product> products = productService.searchByName(keyword);

            if (products.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.notfound("No products found for keyword: " + keyword));
            }

            return ResponseEntity.ok(ApiResponse.success(products, "Search successfully"));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.errorServer(e.getMessage()));
        }
    }
}
