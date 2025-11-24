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
                          ProductImageRepository productImageRepository, DiscountService discountService) {
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
        this.discountService = discountService;
    }
    public List<Product> findAllWithFinalPrice() {

        List<Product> products = productRepository.findAll();

        for (Product p : products) {

            // nếu sản phẩm có mã giảm giá
            if (p.getDiscountCode() != null) {

                DiscountCode dc = p.getDiscountCode();

                // kiểm tra mã giảm giá còn hiệu lực
                DiscountCode valid = discountService.validateDiscount(dc);

                if (valid != null) {
                    double discountValue = p.getPrice() * (valid.getDiscountPercent() / 100);
                    p.setFinalPrice(p.getPrice() - discountValue);
                } else {
                    p.setFinalPrice(p.getPrice());
                }

            } else {
                p.setFinalPrice(p.getPrice());
            }
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
        product.setPrice(productDTO.getPrice());
        product.setColor(productDTO.getColor());
        product.setDescription(productDTO.getDescription());

        //Lưu sản phẩm vào DB trước để có product_id
        Product productCreated = productRepository.save(product);

        //Xử lý danh sách ảnh upload
        List<ProductImage> productImagesList = new ArrayList<>();

        int index = 0;
        for (MultipartFile image : productDTO.getImages()) {
            ProductImage productImage = new ProductImage();

            // Gắn khóa ngoại product_id
            productImage.setProduct(productCreated);

            // Upload file ảnh và lấy đường dẫn lưu
            String imageUrl = UploadService.storeImage(productImagesFolder, image);
            productImage.setImageUrl(imageUrl);

            // Ảnh đầu tiên làm ảnh bìa
            if (index == 0) {
                productImage.setThumbnail(true);
            } else {
                productImage.setThumbnail(false);
            }

            productImagesList.add(productImage);
            index++;
        }

        //Lưu danh sách ảnh vào DB
        productImageRepository.saveAll(productImagesList);

        // Gắn lại danh sách ảnh cho product
        productCreated.setImages(productImagesList);

        //Trả về sản phẩm đã tạo
        return productCreated;
    }

    public Product update(ProductUpdateDTO productUpdateDTO) throws IOException {
        //Tìm sản phẩm
        Product productExisting = productRepository.findById(productUpdateDTO.getId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với ID: " + productUpdateDTO.getId()));

        //Cập nhật thông tin
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

        //Nếu có upload ảnh mới → xóa toàn bộ ảnh cũ và thêm mới
        if (productUpdateDTO.getImages() != null && !productUpdateDTO.getImages().isEmpty()) {
            // Lấy toàn bộ ảnh cũ trong DB
            List<ProductImage> oldImages = productImageRepository.findByProduct(productExisting);

            // Xóa ảnh cũ cả trong DB lẫn thư mục
            for (ProductImage img : oldImages) {
                UploadService.deleteImage(img.getImageUrl().substring(UploadService.rootUrl.length()));
                productImageRepository.delete(img);
            }

            // Thêm ảnh mới
            List<ProductImage> newImages = new ArrayList<>();
            int index = 0;
            for (MultipartFile image : productUpdateDTO.getImages()) {
                String imageUrl = UploadService.storeImage(productImagesFolder, image);

                ProductImage productImage = new ProductImage();
                productImage.setProduct(productExisting);
                productImage.setImageUrl(imageUrl);
                productImage.setThumbnail(index == 0); // ảnh đầu tiên là bìa
                newImages.add(productImage);
                index++;
            }
            productImageRepository.saveAll(newImages);
        }

        // Nếu có danh sách ảnh cần xóa riêng (frontend gửi deleteImagesId)
        if (productUpdateDTO.getDeleteImagesId() != null && !productUpdateDTO.getDeleteImagesId().isEmpty()) {
            List<ProductImage> deleteList = productImageRepository.findAllById(productUpdateDTO.getDeleteImagesId());

            for (ProductImage productImage : deleteList) {
                UploadService.deleteImage(productImage.getImageUrl().substring(UploadService.rootUrl.length()));
                productImageRepository.delete(productImage);
            }
        }

        // Đảm bảo chỉ có 1 ảnh thumbnail
        List<ProductImage> remainingImages = productImageRepository.findByProduct(productExisting);
        boolean hasThumbnail = remainingImages.stream().anyMatch(ProductImage::isThumbnail);
        if (!hasThumbnail && !remainingImages.isEmpty()) {
            ProductImage first = remainingImages.get(0);
            first.setThumbnail(true);
            productImageRepository.save(first);
        } else {
            // Nếu có nhiều thumbnail → chỉ giữ 1
            boolean firstFound = false;
            for (ProductImage img : remainingImages) {
                if (img.isThumbnail()) {
                    if (firstFound) {
                        img.setThumbnail(false);
                        productImageRepository.save(img);
                    } else {
                        firstFound = true;
                    }
                }
            }
        }

        return productRepository.save(productExisting);
    }
    public void delete(Product product) throws IOException {
        List<ProductImage> imagesTODelete = product.getImages();
        if (imagesTODelete.size() > 0) {
            for (ProductImage imageUrl : imagesTODelete) {
                UploadService.deleteImage(imageUrl.getImageUrl().substring(UploadService.rootUrl.length()));
            }
        }
        productRepository.delete(product);
    }
    //search
    public List<Product> searchByName(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword);
    }
    private void applyFinalPrice(Product p) {

        if (p.getDiscountCode() == null) {
            p.setFinalPrice(null);  // không có discount -> finalPrice = null
            return;
        }

        DiscountCode valid = discountService.validateDiscount(p.getDiscountCode());

        if (valid != null) {
            double discountValue = p.getPrice() * (valid.getDiscountPercent() / 100);
            p.setFinalPrice(p.getPrice() - discountValue);
        } else {
            p.setFinalPrice(null); // mã hết hạn / không dùng -> finalPrice = null
        }
    }
    public Product getProductById(Long id) {

        Product p = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm ID: " + id));

        // Gán finalPrice
        applyFinalPrice(p);

        // Trả về toàn bộ object sản phẩm kèm ảnh, discountCode, finalPrice
        return p;
    }



}