package kj002.tripplaner.controllers;

import kj002.tripplaner.dtos.NewsCommentDTO;
import kj002.tripplaner.dtos.NewsDTO;
import kj002.tripplaner.models.News;
import kj002.tripplaner.models.NewsComment;
import kj002.tripplaner.services.NewAIService;
import kj002.tripplaner.services.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    @Autowired
    private NewsService newsService;

    // CREATE
    @PostMapping(consumes = {"multipart/form-data"})
    public News createNews(
            @ModelAttribute News news,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
        return newsService.createNews(news, image);
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
    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public News updateNews(
            @PathVariable Long id,
            @ModelAttribute News news,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
        return newsService.updateNews(id, news, image);
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
    private NewAIService aiService;

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
