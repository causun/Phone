package kj002.tripplaner.controllers;

import jakarta.validation.Valid;
import kj002.tripplaner.dtos.ProductCreateDTO;
import kj002.tripplaner.dtos.ProductUpdateDTO;
import kj002.tripplaner.helpers.ApiResponse;
import kj002.tripplaner.models.Product;
import kj002.tripplaner.services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

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
            var list = productService.findAllWithFinalPrice();
            return ResponseEntity.ok(ApiResponse.success(list, "Get product list successfully"));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.errorServer(e.getMessage()));
        }
    }
    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> addProduct(
            @Valid @ModelAttribute ProductCreateDTO productDTO,
            BindingResult bindingResult) {

        try{
            if(productDTO.getImages()==null || productDTO.getImages().isEmpty()){
                bindingResult.rejectValue("images","400", "Images are required");
            }

            if(bindingResult.hasErrors()){
                return ResponseEntity.badRequest()
                        .body(ApiResponse.badRequest(bindingResult));
            }

            Product created = productService.create(productDTO);

            var dto = productService.getProductById(created.getId());

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.created(dto, "Add product successfully"));

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.errorServer(e.getMessage()));
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getProduct(@PathVariable Long id){
        try{
            var dto = productService.getProductById(id);
            return ResponseEntity.ok(ApiResponse.success(dto, "Get product successfully"));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.notfound(e.getMessage()));
        }
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id){
        try{
            Optional<Product> productExisting = productService.findById(id);

            if(productExisting.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.notfound("Product not found"));
            }

            productService.delete(productExisting.get());

            return ResponseEntity.ok(ApiResponse.success(null, "Delete product successfully"));

        }catch (IOException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.errorServer(e.getMessage()));
        }
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> updateProduct(
            @PathVariable Long id,
            @Valid @ModelAttribute ProductUpdateDTO productUpdateDTO,
            BindingResult bindingResult){

        try{
            Optional<Product> productExisting = productService.findById(id);

            if(productExisting.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.notfound("Product not found"));
            }

            if(bindingResult.hasErrors()){
                return ResponseEntity.badRequest()
                        .body(ApiResponse.badRequest(bindingResult));
            }

            productUpdateDTO.setId(id);

            Product updated = productService.update(productUpdateDTO);

            var dto = productService.getProductById(updated.getId());

            return ResponseEntity.ok(ApiResponse.success(dto,"Update product successfully"));

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.errorServer(e.getMessage()));
        }
    }
    @GetMapping("/search-by-name")
    public ResponseEntity<?> search(@RequestParam String keyword) {
        return ResponseEntity.ok(
                ApiResponse.success(
                        productService.searchByName(keyword),
                        "Search successfully"
                )
        );
    }

    @GetMapping("/brand/{brandId}")
    public ResponseEntity<?> filterByBrand(@PathVariable Long brandId) {
        return ResponseEntity.ok(
                ApiResponse.success(
                        productService.filterByBrand(brandId),
                        "Filter by brand successfully"
                )
        );
    }
}
