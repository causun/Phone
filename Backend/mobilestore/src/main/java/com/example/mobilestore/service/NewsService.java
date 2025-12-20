package com.example.mobilestore.service;

import com.example.mobilestore.dto.NewsCommentDTO;
import com.example.mobilestore.dto.NewsDTO;
import com.example.mobilestore.model.News;
import com.example.mobilestore.model.NewsComment;
import com.example.mobilestore.model.NewsLike;
import com.example.mobilestore.repository.NewsCommentRepository;
import com.example.mobilestore.repository.NewsLikeRepository;
import com.example.mobilestore.repository.NewsRepository;
import com.example.mobilestore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NewsService {

    @Autowired
    private NewsRepository newsRepo;

    @Autowired
    private NewsLikeRepository likeRepo;

    @Autowired
    private NewsCommentRepository commentRepo;

    @Autowired
    private UserRepository userRepo;

    // ====== CREATE =======
    public News createNews(News news) {
        if (news.getCreatedAt() == null)
            news.setCreatedAt(java.time.LocalDateTime.now());
        news.setViewCount(0);
        return newsRepo.save(news);
    }

    // ====== GET ALL NEWS + STATS =======
    public List<NewsDTO.NewsResponse> getAllNews() {
        return newsRepo.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // ====== GET NEWS BY ID + AUTO INCREASE VIEWS (chỉ user) =======
    public NewsDTO.NewsResponse getNewsDetail(Long id, boolean isAdmin) {
        News news = newsRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("News not found"));

        if (!isAdmin) { // chỉ tăng view khi không phải admin
            news.setViewCount(news.getViewCount() + 1);
            newsRepo.save(news);
        }

        return toResponse(news);
    }

    // ====== UPDATE =======
    public News updateNews(Long id, News updatedNews) {
        News exist = newsRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));

        exist.setTitle(updatedNews.getTitle());
        exist.setContent(updatedNews.getContent());
        exist.setAuthor(updatedNews.getAuthor());
        exist.setUpdatedAt(java.time.LocalDateTime.now());

        return newsRepo.save(exist);
    }

    // ====== DELETE =======
    public void deleteNews(Long id) {
        newsRepo.deleteById(id);
    }

    // ====== LIKE =======
    public boolean toggleLike(Long newsId, Long userId) {
        var exist = likeRepo.findByNewsIdAndUserId(newsId, userId);

        if (exist.isPresent()) {
            likeRepo.delete(exist.get());
            return false;
        } else {
            NewsLike like = new NewsLike();
            like.setNewsId(newsId);
            like.setUserId(userId);
            likeRepo.save(like);
            return true;
        }
    }

    public int countLikes(Long newsId) {
        return likeRepo.findByNewsId(newsId).size();
    }

    // ====== COMMENTS =======
    public NewsCommentDTO addComment(NewsComment cmt) {
        if (cmt.getCreatedAt() == null)
            cmt.setCreatedAt(java.time.LocalDateTime.now());

        NewsComment saved = commentRepo.save(cmt);
        return toCommentDTO(saved);
    }

    public List<NewsCommentDTO> getComments(Long newsId) {
        return commentRepo.findByNewsIdOrderByCreatedAtDesc(newsId)
                .stream().map(this::toCommentDTO)
                .collect(Collectors.toList());
    }

    // ====== Convert Entity → DTO =======
    private NewsDTO.NewsResponse toResponse(News n) {
        NewsDTO.NewsResponse dto = new NewsDTO.NewsResponse();

        dto.setId(n.getId());
        dto.setTitle(n.getTitle());
        dto.setContent(n.getContent());
        dto.setAuthor(n.getAuthor());
        dto.setCreatedAt(n.getCreatedAt());
        dto.setLikes(countLikes(n.getId()));
        dto.setComments(getComments(n.getId()).size());
        dto.setViews(n.getViewCount());

        return dto;
    }

    private NewsCommentDTO toCommentDTO(NewsComment c) {
        NewsCommentDTO dto = new NewsCommentDTO();

        dto.setId(c.getId());
        dto.setNewsId(c.getNewsId());
        dto.setUserId(c.getUserId());
        dto.setContent(c.getContent());
        dto.setCreatedAt(c.getCreatedAt());
        dto.setParentId(c.getParentId());

        userRepo.findById(c.getUserId()).ifPresent(u -> {
            dto.setUsername(u.getName());
            dto.setEmail(u.getEmail());
        });

        return dto;
    }
}
