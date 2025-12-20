package com.example.mobilestore.controller;

import com.example.mobilestore.dto.CategoryDTO;
import com.example.mobilestore.model.Category;
import com.example.mobilestore.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    @Autowired private CategoryService categoryService;

    @GetMapping
    public List<CategoryDTO> getAll(){
        return categoryService.getAllActiveDTO();
    }

    @PostMapping("/save")
    public Category save(@RequestBody Category c){ return categoryService.save(c); }

    @GetMapping("/{id}")
    public Category getById(@PathVariable Long id){
        return categoryService.getById(id);
    }

    @PutMapping("/{id}")
    public Category update(@PathVariable Long id, @RequestBody Category c){
        Category existing = categoryService.getById(id);
        if(existing != null){
            existing.setName(c.getName());
            existing.setDescription(c.getDescription());
            existing.setActive(c.isActive());
            return categoryService.save(existing);
        }
        return null;
    }


    @PatchMapping("/toggle/{id}")
    public Category toggleStatus(@PathVariable Long id){
        Category c = categoryService.getById(id);
        if(c != null){
            c.setActive(!c.isActive());
            return categoryService.save(c);
        }
        return null;
    }




}
