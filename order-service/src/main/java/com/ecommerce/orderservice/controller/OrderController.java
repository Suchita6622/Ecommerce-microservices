package com.ecommerce.orderservice.controller;

import com.ecommerce.orderservice.entity.Order;
import com.ecommerce.orderservice.service.OrderService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/orders")
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "http://localhost:5174",
                "http://localhost:5175"
        }
)
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderService.createOrder(order);
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUserId(@PathVariable UUID userId) {
        return orderService.getOrdersByUserId(userId);
    }

    @PutMapping("/{id}/status")
    public Order updateOrderStatus(
            @PathVariable UUID id,
            @RequestParam String status) {

        return orderService.updateOrderStatus(id, status);
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable UUID id) {
        return orderService.getOrderById(id);
    }

    @PutMapping("/{id}/cancel")
    public Order cancelOrder(@PathVariable UUID id) {
        return orderService.cancelOrder(id);
    }
}