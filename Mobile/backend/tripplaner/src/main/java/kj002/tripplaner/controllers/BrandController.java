package kj002.tripplaner.controllers;

import kj002.tripplaner.dtos.BrandDTO;
import kj002.tripplaner.services.BrandService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
public class BrandController {

    private final BrandService brandService;

    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }

    // ================== CREATE ==================
    @PostMapping
    public ResponseEntity<BrandDTO> create(@RequestBody BrandDTO dto) {
        return ResponseEntity.ok(brandService.create(dto));
    }

    // ================== UPDATE ==================
    @PutMapping("/{id}")
    public ResponseEntity<BrandDTO> update(
            @PathVariable Long id,
            @RequestBody BrandDTO dto
    ) {
        return ResponseEntity.ok(brandService.update(id, dto));
    }

    // ================== DELETE (SOFT) ==================
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        brandService.delete(id);
        return ResponseEntity.ok().build();
    }

    // ================== GET ALL (USER / ADMIN) ==================
    @GetMapping
    public ResponseEntity<List<BrandDTO>> getAll(
            @RequestParam(value = "admin", defaultValue = "false") boolean admin
    ) {
        if (admin) {
            // ADMIN → tất cả brand
            return ResponseEntity.ok(brandService.getAllForAdmin());
        }
        // USER → chỉ brand active
        return ResponseEntity.ok(brandService.getAllActive());
    }

    // ================== GET BY ID ==================
    @GetMapping("/{id}")
    public ResponseEntity<BrandDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(brandService.getById(id));
    }
}
