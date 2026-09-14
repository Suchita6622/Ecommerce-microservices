package com.ecommerce.orderservice.controller;

import com.ecommerce.orderservice.entity.PromoCode;
import com.ecommerce.orderservice.service.PromoCodeService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/promo-codes")
public class PromoCodeController {

    private final PromoCodeService promoCodeService;

    public PromoCodeController(PromoCodeService promoCodeService) {
        this.promoCodeService = promoCodeService;
    }
    @PostMapping
    public PromoCode createPromoCode(@RequestBody PromoCode promoCode) {
        return promoCodeService.createPromoCode(promoCode);
    }

}