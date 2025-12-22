package kj002.tripplaner.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NewAIService {

    @Value("${groq.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();

    private static final String API_URL =
            "https://api.groq.com/openai/v1/chat/completions";

    private static final String MODEL = "llama-3.3-70b-versatile";

    public Map<String, String> generateNews(String topic) {

        String prompt = """
        Hãy viết một bài TIN TỨC cho shop điện thoại với chủ đề sau:

        %s

        YÊU CẦU:
        - Viết bằng tiếng Việt
        - Có tiêu đề trong <h1>
        - Nội dung 300–500 từ
        - Định dạng HTML
        - Không dùng markdown
        """.formatted(topic);

        try {
            // ===== BUILD JSON BODY (ĐÚNG KIỂU) =====
            ObjectNode root = mapper.createObjectNode();
            root.put("model", MODEL);
            root.put("temperature", 0.7);

            ArrayNode messages = mapper.createArrayNode();
            messages.add(
                    mapper.createObjectNode()
                            .put("role", "user")
                            .put("content", prompt)
            );

            root.set("messages", messages);

            String requestBody = mapper.writeValueAsString(root);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            HttpEntity<String> entity =
                    new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    API_URL,
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            JsonNode json = mapper.readTree(response.getBody());
            String html = json.path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

            String title = topic;
            String content = html;

            if (html.contains("<h1>")) {
                title = html.replaceAll("(?s).*?<h1>(.*?)</h1>.*", "$1").trim();
                content = html.replaceFirst("(?s)<h1>.*?</h1>", "").trim();
            }

            Map<String, String> result = new HashMap<>();
            result.put("title", title);
            result.put("content", content);

            return result;

        } catch (Exception e) {
            throw new RuntimeException("Groq AI generateNews error: " + e.getMessage(), e);
        }
    }
}
