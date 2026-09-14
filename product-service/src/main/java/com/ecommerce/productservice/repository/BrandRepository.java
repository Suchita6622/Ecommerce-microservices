package com.ecommerce.productservice.repository;

import com.ecommerce.productservice.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrandRepository extends JpaRepository<Brand, Long> {
}