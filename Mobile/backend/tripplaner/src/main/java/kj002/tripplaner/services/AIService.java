package kj002.tripplaner.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class AIService {

    @Value("${groq.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();

    private static final String API_URL = "https://api.groq.com/openai/v1/chat/completions";

    private static final String MODEL = "llama-3.3-70b-versatile";

    public String generateConclusion(String info1, String info2) {

        String prompt = """
    Hãy so sánh 2 sản phẩm dưới đây và trả về kết luận NGẮN GỌN (5–7 dòng):

    --- SẢN PHẨM 1 ---
    %s

    --- SẢN PHẨM 2 ---
    %s

    YÊU CẦU:
    - So sánh thật ngắn từng phần: màn hình, hiệu năng, camera, pin, bộ nhớ, chipset.
    - Chỉ nêu điểm mạnh nổi bật của mỗi sản phẩm.
    - Đề xuất sản phẩm phù hợp theo 2 nhu cầu: chơi game và chụp hình.
    - Cuối cùng đưa ra kết luận dạng 1–2 câu.
    - Không viết dài dòng, không giải thích lan man.
    """.formatted(info1, info2);


        try {
            String requestBody = mapper.writeValueAsString(
                    mapper.createObjectNode()
                            .put("model", MODEL)
                            .set("messages", mapper.createArrayNode()
                                    .add(
                                            mapper.createObjectNode()
                                                    .put("role", "user")
                                                    .put("content", prompt)
                                    )
                            )
            );

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    API_URL,
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            JsonNode root = mapper.readTree(response.getBody());
            return root.path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

        } catch (Exception e) {
            throw new RuntimeException("Groq API error: " + e.getMessage());
        }
    }
}
