package com.example.backend.controller;

import com.example.backend.dto.PharmacyProfileRequest;
import com.example.backend.dto.PharmacyProfileResponse;
import com.example.backend.service.PharmacyProfileService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pharmacy/profile")
@PreAuthorize("hasRole('PHARMACY')")
public class PharmacyProfileController {

    private final PharmacyProfileService service;

    public PharmacyProfileController(PharmacyProfileService service) {
        this.service = service;
    }

    @PostMapping
    public PharmacyProfileResponse create(
            @RequestBody PharmacyProfileRequest request,
            Authentication authentication
    ) {
        return service.create(request, authentication.getName());
    }

    @GetMapping
    public PharmacyProfileResponse get(Authentication authentication) {
        return service.get(authentication.getName());
    }

    @PutMapping
    public PharmacyProfileResponse update(
            @RequestBody PharmacyProfileRequest request,
            Authentication authentication
    ) {
        return service.update(request, authentication.getName());
    }

    @DeleteMapping
    public String delete(Authentication authentication) {
        service.delete(authentication.getName());
        return "Pharmacy profile deleted successfully";
    }
}
