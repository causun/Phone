package com.example.mobilestore.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class AIService {

    @Value("${openai.api.key}")
    private String apiKey;

    private final ObjectMapper mapper = new ObjectMapper();

    public Map<String, String> generateNews(String topic) throws Exception {
        String url = "https://api.openai.com/v1/chat/completions"; // Gemini dùng endpoint OpenAI-compatible
        RestTemplate restTemplate = new RestTemplate();

        // Body request
        Map<String, Object> body = new HashMap<>();
        body.put("model", "gpt-3.5-turbo"); // model miễn phí
        body.put("messages", new Object[]{
                new HashMap<String, String>() {{
                    put("role", "user");
                    put("content", "Viết 1 bài viết tin tức cho shop điện thoại với chủ đề: " + topic +
                            "\nYêu cầu: tiêu đề riêng, nội dung khoảng 300-500 từ, định dạng HTML.");
                }}
        });

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        // Parse JSON
        JsonNode json = mapper.readTree(response.getBody());
        String text = json.path("choices").get(0).path("message").path("content").asText();

        // Tách title/content từ kết quả (giả sử title ở dòng đầu)
        String[] lines = text.split("\n", 2);
        String title = lines.length > 0 ? lines[0].trim() : topic;
        String content = lines.length > 1 ? lines[1].trim() : text;

        Map<String, String> result = new HashMap<>();
        result.put("title", title);
        result.put("content", content);
        return result;
    }
}
