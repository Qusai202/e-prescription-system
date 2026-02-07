package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    @NotBlank
    private String email;

    @NotBlank
    private String password;

    // PATIENT / DOCTOR / PHARMACY
    @NotBlank
    private String role;

    @NotBlank
    private String fullName;
}
