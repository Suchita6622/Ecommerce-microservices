package com.ecommerce.orderservice.controller;

import com.ecommerce.orderservice.entity.Address;
import com.ecommerce.orderservice.service.AddressService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/addresses")
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "http://localhost:5174",
                "http://localhost:5175"
        }
)
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @PostMapping
    public Address addAddress(@RequestBody Address address) {
        return addressService.addAddress(address);
    }

    @GetMapping("/user/{userId}")
    public List<Address> getAddressesByUserId(@PathVariable UUID userId) {
        return addressService.getAddressesByUserId(userId);
    }
}