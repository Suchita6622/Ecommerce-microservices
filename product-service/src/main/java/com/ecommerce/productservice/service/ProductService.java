
package com.ecommerce.productservice.service;

import com.ecommerce.productservice.entity.Product;
import com.ecommerce.productservice.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.math.BigDecimal;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository)
    {
        this.productRepository = productRepository;
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }
    public List<Product> getProductsByPriceRange(BigDecimal minPrice,
                                                 BigDecimal maxPrice) {
        return productRepository.findByPriceBetween(minPrice, maxPrice);

    }
    public List<Product> getProductsByCategoryAndPrice(
            Long categoryId,
            BigDecimal minPrice,
            BigDecimal maxPrice) {

        return productRepository.findByCategoryIdAndPriceBetween(
                categoryId, minPrice, maxPrice);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElse(null);
    }
    public Product updateProduct(Long id, Product updatedProduct) {

        Product existingProduct = productRepository.findById(id)
                .orElse(null);

        if (existingProduct == null) {
            return null;
        }

        existingProduct.setName(updatedProduct.getName());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setQuantity(updatedProduct.getQuantity());

        return productRepository.save(existingProduct);
    }

    public void deleteProduct(Long id)
    {
        productRepository.deleteById(id);
    }
}