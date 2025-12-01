package com.example.mobilestore.controller;

import com.example.mobilestore.model.News;
import com.example.mobilestore.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "http://localhost:3000") // hoặc domain frontend
public class NewsController {

    @Autowired
    private NewsService newsService;

    @GetMapping
    public List<News> getAll() {
        return newsService.getAll();
    }

    @GetMapping("/{id}")
    public News getById(@PathVariable Long id) {
        return newsService.getById(id);
    }

    @PostMapping
    public News create(@RequestBody News news) {
        return newsService.create(news);
    }

    @PutMapping("/{id}")
    public News update(@PathVariable Long id, @RequestBody News news) {
        return newsService.update(id, news);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        newsService.delete(id);
    }
}
