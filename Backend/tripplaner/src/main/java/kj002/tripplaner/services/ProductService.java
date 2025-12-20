package kj002.tripplaner.services;

import kj002.tripplaner.dtos.*;
import kj002.tripplaner.models.Brand;
import kj002.tripplaner.models.Product;
import kj002.tripplaner.models.ProductImage;
import kj002.tripplaner.repositories.BrandRepository;
import kj002.tripplaner.repositories.ProductImageRepository;
import kj002.tripplaner.repositories.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final BrandRepository brandRepository;

    private final String productImagesFolder = "productImages";

    public ProductService(
            ProductRepository productRepository,
            ProductImageRepository productImageRepository,
            BrandRepository brandRepository
    ) {
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
        this.brandRepository = brandRepository;
    }

    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    public ProductDTO getProductById(Long id) {
        Product p = productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Không tìm thấy sản phẩm ID: " + id)
                );
        return toDTO(p);
    }

    public List<ProductDTO> findAllWithFinalPrice() {
        return productRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }
    public Product create(ProductCreateDTO dto) throws IOException {

        Brand brand = brandRepository.findById(dto.getBrandId())
                .orElseThrow(() ->
                        new RuntimeException("Brand không tồn tại ID: " + dto.getBrandId())
                );

        Product product = new Product();
        product.setBrand(brand);
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setScreenSize(dto.getScreenSize());
        product.setRam(dto.getRam());
        product.setStorage(dto.getStorage());
        product.setChipset(dto.getChipset());
        product.setCamera(dto.getCamera());
        product.setBattery(dto.getBattery());
        product.setOs(dto.getOs());
        product.setColor(dto.getColor());
        product.setDescription(dto.getDescription());
        product.setQuantityInStock(dto.getQuantityInStock());

        Product savedProduct = productRepository.save(product);

        saveImages(savedProduct, dto.getImages());

        return savedProduct;
    }

    public Product update(ProductUpdateDTO dto) throws IOException {

        Product product = productRepository.findById(dto.getId())
                .orElseThrow(() ->
                        new RuntimeException("Không tìm thấy sản phẩm ID: " + dto.getId())
                );

        Brand brand = brandRepository.findById(dto.getBrandId())
                .orElseThrow(() ->
                        new RuntimeException("Brand không tồn tại ID: " + dto.getBrandId())
                );

        product.setBrand(brand);
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setScreenSize(dto.getScreenSize());
        product.setRam(dto.getRam());
        product.setStorage(dto.getStorage());
        product.setChipset(dto.getChipset());
        product.setCamera(dto.getCamera());
        product.setBattery(dto.getBattery());
        product.setQuantityInStock(dto.getQuantityInStock());
        product.setOs(dto.getOs());
        product.setColor(dto.getColor());
        product.setDescription(dto.getDescription());
        product.setStatus(dto.getStatus());

        //  UPDATE ẢNH MỚI
        if (dto.getImages() != null && !dto.getImages().isEmpty()) {
            deleteAllImages(product);
            saveImages(product, dto.getImages());
        }

        // XÓA ẢNH THEO ID
        if (dto.getDeleteImagesId() != null && !dto.getDeleteImagesId().isEmpty()) {
            deleteImagesById(dto.getDeleteImagesId());
        }

        // ĐẢM BẢO 1 THUMBNAIL
        ensureThumbnail(product);

        return productRepository.save(product);
    }

    public void delete(Product product) throws IOException {
        deleteAllImages(product);
        productRepository.delete(product);
    }


    public List<ProductDTO> searchByName(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword)
                .stream()
                .map(this::toDTO)
                .toList();
    }


    public List<ProductDTO> filterByBrand(Long brandId) {
        return productRepository.findByBrand_Id(brandId)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    private void saveImages(Product product, List<MultipartFile> files) throws IOException {

        int index = 0;

        for (MultipartFile file : files) {
            ProductImage img = new ProductImage();
            img.setProduct(product);
            img.setImageUrl(
                    UploadService.storeImage(productImagesFolder, file)
            );
            img.setThumbnail(index == 0);

            product.getImages().add(img);
            index++;
        }
    }


    private void deleteAllImages(Product product) throws IOException {

        for (ProductImage img : new ArrayList<>(product.getImages())) {
            UploadService.deleteImage(
                    img.getImageUrl().substring(UploadService.rootUrl.length())
            );
            img.getProduct().getImages().remove(img);
        }
    }


    private void deleteImagesById(List<Long> ids) throws IOException {
        List<ProductImage> images =
                productImageRepository.findAllById(ids);

        for (ProductImage img : images) {
            UploadService.deleteImage(
                    img.getImageUrl().substring(UploadService.rootUrl.length())
            );
            img.getProduct().getImages().remove(img);
        }
    }

    private void ensureThumbnail(Product product) {
        List<ProductImage> images =
                productImageRepository.findByProduct(product);

        boolean hasThumbnail =
                images.stream().anyMatch(ProductImage::isThumbnail);

        if (!hasThumbnail && !images.isEmpty()) {
            ProductImage first = images.get(0);
            first.setThumbnail(true);
            productImageRepository.save(first);
        }
    }
    private ProductDTO toDTO(Product p) {
        ProductDTO dto = new ProductDTO();

        dto.setId(p.getId());
        dto.setName(p.getName());
        dto.setPrice(p.getPrice());
        dto.setQuantityInStock(p.getQuantityInStock());
        dto.setScreenSize(p.getScreenSize());
        dto.setRam(p.getRam());
        dto.setStorage(p.getStorage());
        dto.setChipset(p.getChipset());
        dto.setCamera(p.getCamera());
        dto.setBattery(p.getBattery());
        dto.setOs(p.getOs());
        dto.setColor(p.getColor());
        dto.setDescription(p.getDescription());
        dto.setStatus(p.getStatus());
        dto.setCreatedAt(p.getCreatedAt());

        BrandDTO brandDTO = new BrandDTO();
        brandDTO.setId(p.getBrand().getId());
        brandDTO.setName(p.getBrand().getName());
        dto.setBrand(brandDTO);

        dto.setImageUrls(
                p.getImages().stream()
                        .map(ProductImage::getImageUrl)
                        .toList()
        );

        Double avg = productRepository.getAverageRating(p.getId());
        Long total = productRepository.countReviews(p.getId());

        dto.setAvgRating(avg != null ? avg : 0.0);
        dto.setTotalReviews(total != null ? total : 0);


        return dto;
    }

    public ProductDetailDTO toDetailDTO(Product p) {
        ProductDetailDTO dto = new ProductDetailDTO();

        dto.setId(p.getId());
        dto.setName(p.getName());
        dto.setPrice(p.getPrice());
        dto.setScreenSize(p.getScreenSize());
        dto.setRam(p.getRam());
        dto.setStorage(p.getStorage());
        dto.setChipset(p.getChipset());
        dto.setCamera(p.getCamera());
        dto.setBattery(p.getBattery());
        dto.setOs(p.getOs());
        dto.setColor(p.getColor());
        dto.setDescription(p.getDescription());
        dto.setQuantityInStock(p.getQuantityInStock());

        dto.setImageUrls(
                p.getImages().stream()
                        .map(ProductImage::getImageUrl)
                        .toList()
        );

        return dto;
    }
}
