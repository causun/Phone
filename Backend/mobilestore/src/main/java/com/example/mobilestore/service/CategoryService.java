package com.example.mobilestore.service;

import com.example.mobilestore.dto.CategoryDTO;
import com.example.mobilestore.model.Category;
import com.example.mobilestore.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    @Autowired private CategoryRepository categoryRepository;

    public List<CategoryDTO> getAllActiveDTO() {
        return categoryRepository.findByActiveTrue().stream().map(c -> {
            CategoryDTO dto = new CategoryDTO();
            dto.setId(c.getId());
            dto.setName(c.getName());
            dto.setDescription(c.getDescription());
            dto.setActive(c.isActive());
            dto.setProductCount(c.getProducts() != null ? c.getProducts().size() : 0);
            return dto;
        }).collect(Collectors.toList());
    }
    public Category save(Category c){ return categoryRepository.save(c); }
    public Category getById(Long id){ return categoryRepository.findById(id).orElse(null); }
}
