package kj002.tripplaner.services;

import kj002.tripplaner.dtos.BrandDTO;
import kj002.tripplaner.models.Brand;
import kj002.tripplaner.repositories.BrandRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandService {

    private final BrandRepository brandRepository;

    public BrandService(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    // ================== CREATE ==================
    public BrandDTO create(BrandDTO dto) {

        brandRepository.findByNameIgnoreCase(dto.getName())
                .ifPresent(b -> {
                    throw new RuntimeException("BRAND_ALREADY_EXISTS");
                });

        Brand brand = new Brand();
        brand.setName(dto.getName());
        brand.setActive(true);

        return toDTO(brandRepository.save(brand));
    }

    // ================== UPDATE ==================
    public BrandDTO update(Long id, BrandDTO dto) {

        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("BRAND_NOT_FOUND"));

        brand.setName(dto.getName());
        return toDTO(brandRepository.save(brand));
    }

    // ================== DELETE (SOFT) ==================
    public void delete(Long id) {

        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("BRAND_NOT_FOUND"));

        brand.setActive(false);
        brandRepository.save(brand);
    }

    // ================== USER – CHỈ BRAND ACTIVE ==================
    public List<BrandDTO> getAllActive() {
        return brandRepository.findAll().stream()
                .filter(Brand::getActive)
                .map(this::toDTO)
                .toList();
    }

    // ================== ADMIN – TẤT CẢ BRAND ==================
    public List<BrandDTO> getAllForAdmin() {
        return brandRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    // ================== GET BY ID ==================
    public BrandDTO getById(Long id) {

        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("BRAND_NOT_FOUND"));

        return toDTO(brand);
    }

    // ================== MAPPER ==================
    private BrandDTO toDTO(Brand brand) {
        BrandDTO dto = new BrandDTO();
        dto.setId(brand.getId());
        dto.setName(brand.getName());
        return dto;
    }
}
