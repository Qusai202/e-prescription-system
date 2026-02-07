package com.example.backend.service;

import com.example.backend.dto.PharmacyProfileRequest;
import com.example.backend.dto.PharmacyProfileResponse;
import com.example.backend.entity.PharmacyProfile;
import com.example.backend.entity.User_Entity;
import com.example.backend.repository.PharmacyProfileRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class PharmacyProfileService {

    private final PharmacyProfileRepository pharmacyRepo;
    private final UserRepository userRepo;

    public PharmacyProfileService(
            PharmacyProfileRepository pharmacyRepo,
            UserRepository userRepo
    ) {
        this.pharmacyRepo = pharmacyRepo;
        this.userRepo = userRepo;
    }

    // CREATE
    public PharmacyProfileResponse create(
            PharmacyProfileRequest request,
            String email
    ) {

        User_Entity user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (pharmacyRepo.findByUser(user).isPresent()) {
            throw new RuntimeException("Pharmacy profile already exists");
        }

        PharmacyProfile profile = new PharmacyProfile();
        profile.setUser(user);
        profile.setPharmacyName(request.getPharmacyName());
        profile.setPhone(request.getPhone());
        profile.setAddress(request.getAddress());
        profile.setOpen24Hours(request.isOpen24Hours());

        return mapToResponse(pharmacyRepo.save(profile));
    }

    // READ
    public PharmacyProfileResponse get(String email) {

        User_Entity user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PharmacyProfile profile = pharmacyRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        return mapToResponse(profile);
    }

    // UPDATE
    public PharmacyProfileResponse update(
            PharmacyProfileRequest request,
            String email
    ) {

        User_Entity user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PharmacyProfile profile = pharmacyRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        profile.setPharmacyName(request.getPharmacyName());
        profile.setPhone(request.getPhone());
        profile.setAddress(request.getAddress());
        profile.setOpen24Hours(request.isOpen24Hours());

        return mapToResponse(pharmacyRepo.save(profile));
    }

    // DELETE
    public void delete(String email) {

        User_Entity user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PharmacyProfile profile = pharmacyRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        pharmacyRepo.delete(profile);
    }

    // Mapper
    private PharmacyProfileResponse mapToResponse(PharmacyProfile profile) {
        return new PharmacyProfileResponse(
                profile.getId(),
                profile.getUser().getEmail(),
                profile.getPharmacyName(),
                profile.getPhone(),
                profile.getAddress(),
                profile.isOpen24Hours()
        );
    }
}
