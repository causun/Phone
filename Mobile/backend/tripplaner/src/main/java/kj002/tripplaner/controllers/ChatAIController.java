package kj002.tripplaner.controllers;

import kj002.tripplaner.services.AIChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:3000") // Đảm bảo React truy cập được
public class ChatAIController {
    @Autowired
    private AIChatService aiService;

    @PostMapping("/chat")
    public Map<String, String> chat(@RequestBody Map<String, Object> body) {
        List<Map<String, String>> history = (List<Map<String, String>>) body.get("history");
        String reply = aiService.chatWithHistory(history);
        Map<String, String> res = new HashMap<>();
        res.put("reply", reply);
        return res;
    }
}