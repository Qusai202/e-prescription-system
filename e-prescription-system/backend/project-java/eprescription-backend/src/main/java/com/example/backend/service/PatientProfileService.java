package com.example.backend.service;

import com.example.backend.dto.PatientProfileRequest;
import com.example.backend.dto.PatientProfileResponse;
import com.example.backend.entity.PatientProfile;
import com.example.backend.entity.User_Entity;
import com.example.backend.repository.PatientProfileRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class PatientProfileService {

    private final PatientProfileRepository repo;
    private final UserRepository userRepo;

    public PatientProfileService(
            PatientProfileRepository repo,
            UserRepository userRepo
    ) {
        this.repo = repo;
        this.userRepo = userRepo;
    }

    // CREATE
    public PatientProfileResponse create(
            PatientProfileRequest request,
            String email
    ) {

        User_Entity user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (repo.findByUser(user).isPresent()) {
            throw new RuntimeException("Profile already exists");
        }

        PatientProfile profile = new PatientProfile();
        profile.setUser(user);
        profile.setAge(request.getAge());
        profile.setGender(request.getGender());
        profile.setPhone(request.getPhone());
        profile.setAddress(request.getAddress());

        return mapToResponse(repo.save(profile));
    }

    // READ
    public PatientProfileResponse get(String email) {

        User_Entity user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PatientProfile profile = repo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        return mapToResponse(profile);
    }

    // Mapper
    private PatientProfileResponse mapToResponse(PatientProfile profile) {
        return new PatientProfileResponse(
                profile.getId(),
                profile.getUser().getEmail(),
                profile.getUser().getFullName(),
                profile.getAge(),
                profile.getGender(),
                profile.getPhone(),
                profile.getAddress()
        );
    }
}
