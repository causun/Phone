package kj002.tripplaner.services;

import kj002.tripplaner.dtos.CartItemDTO;
import kj002.tripplaner.models.CartItem;
import kj002.tripplaner.models.User;
import kj002.tripplaner.repositories.CartRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {
    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public List<CartItemDTO> getCartByUser(User user) {
        List<CartItem> items = cartRepository.findByUser(user);
        return items.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private CartItemDTO convertToDTO(CartItem item) {
        CartItemDTO dto = new CartItemDTO();
        dto.setId(item.getId());
        dto.setQuantity(item.getQuantity());

        if (item.getProduct() != null) {
            CartItemDTO.ProductDTO pDto = new CartItemDTO.ProductDTO();
            pDto.setId(item.getProduct().getId());
            pDto.setName(item.getProduct().getName());
            pDto.setPrice(item.getProduct().getPrice());
            // Lấy ảnh đầu tiên từ danh sách images của Product
            if (item.getProduct().getImages() != null && !item.getProduct().getImages().isEmpty()) {
                pDto.setImageUrl(item.getProduct().getImages().get(0).getImageUrl());
            }
            dto.setProduct(pDto);
        }
        return dto;
    }
}