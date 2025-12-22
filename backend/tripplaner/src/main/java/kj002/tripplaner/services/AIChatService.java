package kj002.tripplaner.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import kj002.tripplaner.models.Product;
import kj002.tripplaner.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AIChatService {
    @Value("${openai.api.key}")
    private String apiKey;

    @Autowired
    private ProductRepository productRepository;

    private final ObjectMapper mapper = new ObjectMapper();

    public String chatWithHistory(List<Map<String, String>> history) {
        try {
            // 1. Lấy danh sách sản phẩm từ Database bài chính để Mia tư vấn đúng hàng
            List<Product> products = productRepository.findAll();
            StringBuilder storeData = new StringBuilder();
            for (Product p : products) {
                storeData.append(String.format("- %s: giá %.0f VNĐ\n", p.getName(), p.getPrice()));
            }

            String url = "https://api.openai.com/v1/chat/completions";
            RestTemplate restTemplate = new RestTemplate();

            // 2. Thiết lập hệ thống "não bộ" cho Mia
            String systemPrompt = "Bạn là Mia - Chuyên viên tư vấn công nghệ tại MobileStore...\n" +
                    "DANH SÁCH SẢN PHẨM HIỆN CÓ:\n" + storeData.toString();

            List<Map<String, String>> messagesForAI = new ArrayList<>();
            messagesForAI.add(new HashMap<>() {{ put("role", "system"); put("content", systemPrompt); }});

            // 3. Đưa lịch sử chat vào để Mia nhớ khách đang nói gì
            for (Map<String, String> msg : history) {
                messagesForAI.add(msg);
            }

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", "gpt-3.5-turbo"); // Hoặc gpt-4o-mini nếu muốn thông minh hơn
            requestBody.put("messages", messagesForAI);
            requestBody.put("temperature", 0.7);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + apiKey);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            JsonNode json = mapper.readTree(response.getBody());
            return json.path("choices").get(0).path("message").path("content").asText();

        } catch (Exception e) {
            e.printStackTrace();
            return "Dạ, Mia đang bận kiểm tra kho một chút, Anh/Chị đợi em xíu nhé!";
        }
    }
}