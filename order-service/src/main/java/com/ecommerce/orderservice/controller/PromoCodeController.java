package com.ecommerce.orderservice.controller;

import com.ecommerce.orderservice.entity.PromoCode;
import com.ecommerce.orderservice.service.PromoCodeService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/promo-codes")
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "http://localhost:5174",
                "http://localhost:5175"
        }
)
public class PromoCodeController {

    private final PromoCodeService promoCodeService;

    public PromoCodeController(PromoCodeService promoCodeService) {
        this.promoCodeService = promoCodeService;
    }

    @PostMapping
    public PromoCode createPromoCode(@RequestBody PromoCode promoCode) {
        return promoCodeService.createPromoCode(promoCode);
    }

    @GetMapping
    public List<PromoCode> getAllPromoCodes() {
        return promoCodeService.getAllPromoCodes();
    }

    @GetMapping("/{code}")
    public PromoCode getPromoCode(@PathVariable String code) {
        return promoCodeService.getPromoCode(code);
    }
}