package com.example.backend.controller;

import com.example.backend.dto.PatientProfileRequest;
import com.example.backend.dto.PatientProfileResponse;
import com.example.backend.service.PatientProfileService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patient/profile")
@PreAuthorize("hasRole('PATIENT')")
public class PatientProfileController {

    private final PatientProfileService service;

    public PatientProfileController(PatientProfileService service) {
        this.service = service;
    }

    @PostMapping
    public PatientProfileResponse create(
            @RequestBody PatientProfileRequest request,
            Authentication auth
    ) {
        return service.create(request, auth.getName());
    }

    @GetMapping
    public PatientProfileResponse get(Authentication auth) {
        return service.get(auth.getName());
    }
}
