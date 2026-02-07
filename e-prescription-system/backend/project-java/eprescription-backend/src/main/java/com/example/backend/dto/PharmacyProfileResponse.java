package com.example.backend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class PharmacyProfileResponse {

    private Long id;
    private String email;
    private String pharmacyName;
    private String phone;
    private String address;
    private boolean open24Hours;
}
