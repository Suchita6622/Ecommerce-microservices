package com.ecommerce.orderservice.service;

import com.ecommerce.orderservice.entity.Address;
import com.ecommerce.orderservice.repository.AddressRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AddressService {

    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public Address addAddress(Address address) {
        return addressRepository.save(address);
    }

    public List<Address> getAddressesByUserId(UUID userId) {
        return addressRepository.findAll()
                .stream()
                .filter(address -> address.getUserId().equals(userId))
                .toList();
    }
}