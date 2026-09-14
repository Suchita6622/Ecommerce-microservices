package com.ecommerce.orderservice.service;

import com.ecommerce.orderservice.repository.PromoCodeRepository;
import org.springframework.stereotype.Service;
import com.ecommerce.orderservice.entity.PromoCode;
import java.time.LocalDate;

@Service
public class PromoCodeService {

    private final PromoCodeRepository promoCodeRepository;

    public PromoCodeService(PromoCodeRepository promoCodeRepository) {
        this.promoCodeRepository = promoCodeRepository;
    }
    public PromoCode createPromoCode(PromoCode promoCode) {
        return promoCodeRepository.save(promoCode);
    }
    public PromoCode getPromoCode(String code) {

        PromoCode promoCode = promoCodeRepository.findByCode(code)
                .orElse(null);

        if (promoCode == null) {
            return null;
        }

        if (promoCode.getExpiryDate() != null
                && promoCode.getExpiryDate().isBefore(LocalDate.now())) {
            return null;
        }

        return promoCode;
    }
}