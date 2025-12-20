
package kj002.tripplaner.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

@Service
public class UploadService {

    public static String rootUrl = "http://localhost:8080/";

    public static String uploadFolder = "uploads";

    public static String storeImage(String subFolder, MultipartFile file) throws IOException {

        String subFolderPath = uploadFolder + File.separator + subFolder;
        File directory = new File(subFolderPath);

        if (!directory.exists()) {
            directory.mkdirs();
        }

        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        Path path = Path.of(subFolderPath, fileName);
        Files.copy(file.getInputStream(), path);

        String imageUrlSaved =
                rootUrl +
                        uploadFolder + "/" +
                        subFolder + "/" +
                        fileName;

        return imageUrlSaved;
    }

    public static void deleteImage(String imageExisting) throws IOException {

        if (imageExisting == null) return;

        String filePath = imageExisting
                .replace(rootUrl, "")
                .replace("/", File.separator);

        Path imagePath = Path.of(filePath);
        Files.deleteIfExists(imagePath);
    }
}
