package com.ecommerce.paymentservice.controller;

import com.ecommerce.paymentservice.entity.Payment;
import com.ecommerce.paymentservice.service.PaymentService;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    public Payment createPayment(@RequestBody Payment payment) {
        return paymentService.createPayment(payment);
    }

    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable UUID id) {
        return paymentService.getPaymentById(id);
    }
    @PutMapping("/{id}/status")
    public Payment updatePaymentStatus(
            @PathVariable UUID id,
            @RequestParam String status) {

        return paymentService.updatePaymentStatus(id, status);
    }
}