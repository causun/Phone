package kj002.demo7.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class UploadService {
    public static String rootUrl = "http://localhost:8080/";
    public static String uploadFolder = "uploads";

    public static String storeImage(String subFolder, MultipartFile file) throws IOException {
        String subFolderPath = uploadFolder + File.separator + subFolder;
        File directory = new File(subFolderPath);
        if (!directory.exists()) {
            //uploads/productImages
            directory.mkdirs();
        }
        //tramanh.jpg
        String fileName = UUID.randomUUID() + file.getOriginalFilename();
        //uploads/productImages/tramanh.jpg
        Path path = Path.of(subFolderPath, fileName);
        //Lay dau vao inputStream sao chep toi path
        Files.copy(file.getInputStream(), path);
        String imageUrlSaved = rootUrl +
                subFolderPath + File.separator + fileName;
        return imageUrlSaved;
    }

    public static void deleteImage(String imageExisting) throws IOException {
        Path imagePath = Paths.get(imageExisting);
        Files.deleteIfExists(imagePath);
    }

}
