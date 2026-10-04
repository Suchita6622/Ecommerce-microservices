package com.ecommerce.orderservice.service;

import com.ecommerce.orderservice.entity.Order;
import com.ecommerce.orderservice.repository.OrderRepository;
import com.ecommerce.orderservice.repository.OrderItemRepository;
import org.springframework.stereotype.Service;
import com.ecommerce.orderservice.entity.OrderItem;
import com.ecommerce.orderservice.entity.PromoCode;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;
import java.util.List;
import org.springframework.web.client.RestTemplate;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final PromoCodeService promoCodeService;
    private final RestTemplate restTemplate;
    public OrderService(OrderRepository orderRepository,
                        OrderItemRepository orderItemRepository,
                        PromoCodeService promoCodeService,
                        RestTemplate restTemplate) {

        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.promoCodeService = promoCodeService;
        this.restTemplate = restTemplate;
    }

    public Order createOrder(Order order) {
        if (order.getPromoCode() != null) {

            PromoCode promoCode = promoCodeService.getPromoCode(order.getPromoCode());

            if (promoCode != null
                    && promoCode.isActive()
                    && (promoCode.getMinimumOrderAmount() == null
                    || order.getSubtotal()
                    .compareTo(promoCode.getMinimumOrderAmount()) >= 0)) {

                BigDecimal discount;

                if (promoCode.getDiscountType().equals("PERCENTAGE")) {

                    discount = order.getSubtotal()
                            .multiply(promoCode.getDiscountValue())
                            .divide(BigDecimal.valueOf(100));

                } else if (promoCode.getDiscountType().equals("FIXED")) {

                    discount = promoCode.getDiscountValue();

                } else {

                    discount = BigDecimal.ZERO;
                }

                order.setDiscount(discount);
                order.setFinalAmount(order.getSubtotal().subtract(discount));
            }
        }
        if (order.getDeliveryPinCode() != null) {
            order.setExpectedDeliveryDate(
                    calculateExpectedDeliveryDate(
                            order.getDeliveryPinCode()
                    )
            );
        }

        Order savedOrder = orderRepository.save(order);

        if (order.getItems() != null) {

            for (OrderItem item : order.getItems()) {

                item.setOrderId(savedOrder.getId());

                orderItemRepository.save(item);

                // Reduce product quantity
                String url = "http://localhost:8085/products/"
                        + item.getProductId()
                        + "/reduce-quantity?quantity="
                        + item.getQuantity();

                restTemplate.put(url, null);
            }
        }

        return savedOrder;
    }
    private LocalDate calculateExpectedDeliveryDate(String pinCode) {

        int deliveryDays;

        if (pinCode.startsWith("201")) {
            deliveryDays = 3;
        } else {
            deliveryDays = 5;
        }

        return LocalDate.now().plusDays(deliveryDays);
    }
    public Order updateOrderStatus(UUID id, String status) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setOrderStatus(status);

        return orderRepository.save(order);
    }
    public Order cancelOrder(UUID id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        String currentStatus = order.getOrderStatus();

        if (currentStatus.equals("SHIPPED")
                || currentStatus.equals("OUT_FOR_DELIVERY")
                || currentStatus.equals("DELIVERED")) {

            throw new RuntimeException(
                    "Order cannot be cancelled at this stage"
            );
        }

        order.setOrderStatus("CANCELLED");

        return orderRepository.save(order);
    }
    public Order getOrderById(UUID id) {

        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public List<Order> getOrdersByUserId(UUID userId) {

        List<Order> orders = orderRepository.findByUserId(userId);

        for (Order order : orders) {

            List<OrderItem> items =
                    orderItemRepository.findByOrderId(order.getId());

            order.setItems(items);
        }

        return orders;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}


