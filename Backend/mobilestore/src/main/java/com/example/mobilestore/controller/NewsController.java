package com.example.mobilestore.controller;

import com.example.mobilestore.dto.NewsCommentDTO;
import com.example.mobilestore.dto.NewsDTO;
import com.example.mobilestore.model.News;
import com.example.mobilestore.model.NewsComment;
import com.example.mobilestore.service.AIService;
import com.example.mobilestore.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "http://localhost:3000")
public class NewsController {

    @Autowired
    private NewsService newsService;

    // CREATE
    @PostMapping
    public News createNews(@RequestBody News news) {
        return newsService.createNews(news);
    }

    // GET ALL NEWS (FULL STATS)
    @GetMapping
    public List<NewsDTO.NewsResponse> getAll() {
        return newsService.getAllNews();
    }

    // GET DETAIL (AUTO INCREASE VIEW chỉ user)
    @GetMapping("/{id}")
    public NewsDTO.NewsResponse detail(
            @PathVariable Long id,
            @RequestParam(defaultValue = "false") boolean isAdmin
    ) {
        return newsService.getNewsDetail(id, isAdmin);
    }

    // UPDATE
    @PutMapping("/{id}")
    public News updateNews(@PathVariable Long id, @RequestBody News news) {
        return newsService.updateNews(id, news);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteNews(@PathVariable Long id) {
        newsService.deleteNews(id);
    }

    // LIKE
    @PostMapping("/{id}/like/{userId}")
    public boolean like(@PathVariable Long id, @PathVariable Long userId) {
        return newsService.toggleLike(id, userId);
    }

    @GetMapping("/{id}/likes")
    public int countLikes(@PathVariable Long id) {
        return newsService.countLikes(id);
    }

    // COMMENTS
    @PostMapping("/comment")
    public NewsCommentDTO comment(@RequestBody NewsComment cmt) {
        return newsService.addComment(cmt);
    }

    @GetMapping("/{id}/comments")
    public List<NewsCommentDTO> getComments(@PathVariable Long id) {
        return newsService.getComments(id);
    }


    @Autowired
    private AIService aiService;

    // POST /api/news/ai-generate
    @PostMapping("/ai-generate")
    public Map<String, String> generateNewsByAI(@RequestBody Map<String, String> body) throws Exception {
        String topic = body.get("topic");
        if (topic == null || topic.isEmpty()) {
            throw new RuntimeException("Chưa nhập chủ đề!");
        }
        return aiService.generateNews(topic);
    }


}
