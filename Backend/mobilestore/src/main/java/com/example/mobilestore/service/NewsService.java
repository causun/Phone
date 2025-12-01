package com.example.mobilestore.service;

import com.example.mobilestore.model.News;
import com.example.mobilestore.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NewsService {

    @Autowired
    private NewsRepository newsRepository;

    // Lấy tất cả tin tức
    public List<News> getAll() {
        return newsRepository.findAllByOrderByCreatedAtDesc();
    }

    // Lấy 10 tin mới nhất
    public List<News> getLatest10() {
        return newsRepository.findTop10ByOrderByCreatedAtDesc();
    }

    // Lấy theo ID
    public News getById(Long id) {
        return newsRepository.findById(id).orElse(null);
    }

    // Tạo mới
    public News create(News n) {
        n.setCreatedAt(LocalDateTime.now());
        return newsRepository.save(n);
    }

    // Cập nhật
    public News update(Long id, News n) {
        Optional<News> opt = newsRepository.findById(id);
        if(opt.isPresent()) {
            News news = opt.get();
            news.setTitle(n.getTitle());
            news.setContent(n.getContent());
            news.setAuthor(n.getAuthor());
            return newsRepository.save(news);
        }
        return null;
    }

    // Xóa
    public void delete(Long id) {
        newsRepository.deleteById(id);
    }
}
