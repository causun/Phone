package kj002.demo7.services;

import kj002.demo7.dtos.ProductDTO;
import kj002.demo7.dtos.ProductUpdateDTO;
import kj002.demo7.models.DiscountCode;
import kj002.demo7.models.Product;
import kj002.demo7.models.ProductImage;
import kj002.demo7.repositories.ProductImageRepository;
import kj002.demo7.repositories.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final DiscountService discountService;
    private ProductRepository productRepository;
    private ProductImageRepository productImageRepository;

    public ProductService(ProductRepository productRepository,
                          ProductImageRepository productImageRepository,
                          DiscountService discountService) {
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
        this.discountService = discountService;
    }

    public List<Product> findAllWithFinalPrice() {

        List<Product> products = productRepository.findAll();

        for (Product p : products) {
            applyFinalPrice(p);
        }

        return products;
    }

    private String productImagesFolder = "productImages";

    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    public Product create(ProductDTO productDTO) throws IOException {

        Product product = new Product();

        product.setBrand(productDTO.getBrand());
        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        product.setScreenSize(productDTO.getScreenSize());
        product.setRam(productDTO.getRam());
        product.setStorage(productDTO.getStorage());
        product.setChipset(productDTO.getChipset());
        product.setCamera(productDTO.getCamera());
        product.setBattery(productDTO.getBattery());
        product.setOs(productDTO.getOs());
        product.setColor(productDTO.getColor());
        product.setDescription(productDTO.getDescription());
        product.setQuantityInStock(productDTO.getQuantityInStock());

        // Lưu vào DB trước để có ID
        Product productCreated = productRepository.save(product);

        // Lưu ảnh
        List<ProductImage> productImagesList = new ArrayList<>();

        int index = 0;
        for (MultipartFile image : productDTO.getImages()) {
            ProductImage productImage = new ProductImage();
            productImage.setProduct(productCreated);

            String imageUrl = UploadService.storeImage(productImagesFolder, image);
            productImage.setImageUrl(imageUrl);

            productImage.setThumbnail(index == 0);

            productImagesList.add(productImage);
            index++;
        }

        productImageRepository.saveAll(productImagesList);

        productCreated.setImages(productImagesList);

        return productCreated;
    }

    public Product update(ProductUpdateDTO productUpdateDTO) throws IOException {

        Product productExisting = productRepository.findById(productUpdateDTO.getId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với ID: " + productUpdateDTO.getId()));

        productExisting.setBrand(productUpdateDTO.getBrand());
        productExisting.setName(productUpdateDTO.getName());
        productExisting.setPrice(productUpdateDTO.getPrice());
        productExisting.setScreenSize(productUpdateDTO.getScreenSize());
        productExisting.setRam(productUpdateDTO.getRam());
        productExisting.setStorage(productUpdateDTO.getStorage());
        productExisting.setChipset(productUpdateDTO.getChipset());
        productExisting.setCamera(productUpdateDTO.getCamera());
        productExisting.setBattery(productUpdateDTO.getBattery());
        productExisting.setQuantityInStock(productUpdateDTO.getQuantityInStock());
        productExisting.setOs(productUpdateDTO.getOs());
        productExisting.setColor(productUpdateDTO.getColor());
        productExisting.setDescription(productUpdateDTO.getDescription());
        productExisting.setStatus(productUpdateDTO.getStatus());

        // Xử lý ảnh mới
        if (productUpdateDTO.getImages() != null && !productUpdateDTO.getImages().isEmpty()) {
            List<ProductImage> oldImages = productImageRepository.findByProduct(productExisting);

            for (ProductImage img : oldImages) {
                UploadService.deleteImage(img.getImageUrl().substring(UploadService.rootUrl.length()));
                productImageRepository.delete(img);
            }

            List<ProductImage> newImages = new ArrayList<>();
            int index = 0;
            for (MultipartFile image : productUpdateDTO.getImages()) {

                String imageUrl = UploadService.storeImage(productImagesFolder, image);

                ProductImage productImage = new ProductImage();
                productImage.setProduct(productExisting);
                productImage.setImageUrl(imageUrl);
                productImage.setThumbnail(index == 0);

                newImages.add(productImage);
                index++;
            }

            productImageRepository.saveAll(newImages);
        }

        // Xóa ảnh theo ID (frontend gửi)
        if (productUpdateDTO.getDeleteImagesId() != null && !productUpdateDTO.getDeleteImagesId().isEmpty()) {
            List<ProductImage> deleteList = productImageRepository.findAllById(productUpdateDTO.getDeleteImagesId());

            for (ProductImage productImage : deleteList) {
                UploadService.deleteImage(productImage.getImageUrl().substring(UploadService.rootUrl.length()));
                productImageRepository.delete(productImage);
            }
        }

        // Đảm bảo chỉ có 1 thumbnail
        List<ProductImage> remainingImages = productImageRepository.findByProduct(productExisting);
        boolean hasThumbnail = remainingImages.stream().anyMatch(ProductImage::isThumbnail);

        if (!hasThumbnail && !remainingImages.isEmpty()) {
            ProductImage first = remainingImages.get(0);
            first.setThumbnail(true);
            productImageRepository.save(first);
        }

        return productRepository.save(productExisting);
    }

    public void delete(Product product) throws IOException {
        List<ProductImage> imagesTODelete = product.getImages();
        if (!imagesTODelete.isEmpty()) {
            for (ProductImage imageUrl : imagesTODelete) {
                UploadService.deleteImage(imageUrl.getImageUrl().substring(UploadService.rootUrl.length()));
            }
        }
        productRepository.delete(product);
    }

    public List<Product> searchByName(String keyword) {
        List<Product> products = productRepository.findByNameContainingIgnoreCase(keyword);

        for (Product p : products) {
            applyFinalPrice(p);
        }

        return products;
    }

    private void applyFinalPrice(Product p) {

        DiscountCode dc = p.getDiscountCode();

        if (dc == null) {
            p.setFinalPrice(null);
            return;
        }

        DiscountCode valid = discountService.validateDiscount(dc);

        if (valid != null) {
            double discountValue = p.getPrice() * (valid.getDiscountPercent() / 100);
            p.setFinalPrice(p.getPrice() - discountValue);
        } else {
            p.setFinalPrice(null);
        }
    }

    public Product getProductById(Long id) {

        Product p = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm ID: " + id));

        applyFinalPrice(p);

        return p;
    }

}
