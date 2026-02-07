package com.example.backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/doctor")
    @PreAuthorize("hasRole('DOCTOR')")
    public String doctorOnly() {
        return "Doctor access granted";
    }

    @GetMapping("/patient")
    @PreAuthorize("hasRole('PATIENT')")
    public String patientOnly() {
        return "Patient access granted";
    }

    @GetMapping("/pharmacy")
    @PreAuthorize("hasRole('PHARMACY')")
    public String pharmacyOnly() {
        return "Pharmacy access granted";
    }

}
