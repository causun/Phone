package kj002.tripplaner.dtos;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import kj002.tripplaner.models.Gender;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UserUpdate {
    private String email;
    private String fullName;
    private String phone;
    private String address;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private MultipartFile file;
}
