package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PharmacyProfileRequest {

    private String pharmacyName;
    private String phone;
    private String address;
    private boolean open24Hours;
}
