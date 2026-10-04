package com.ecommerce.paymentservice.service;

import com.ecommerce.paymentservice.entity.Payment;
import com.ecommerce.paymentservice.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public Payment createPayment(Payment payment) {

        if ("COD".equalsIgnoreCase(payment.getPaymentMethod())) {
            payment.setPaymentStatus("PENDING");
        } else {
            payment.setPaymentStatus("PENDING");
        }

        return paymentRepository.save(payment);
    }

    public Payment getPaymentById(UUID id) {

        return paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }
    public Payment updatePaymentStatus(UUID id, String status) {

        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        payment.setPaymentStatus(status);

        return paymentRepository.save(payment);
    }
}