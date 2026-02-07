package com.example.backend.service;

import com.example.backend.dto.DoctorListResponse;
import com.example.backend.dto.DoctorProfileRequest;
import com.example.backend.dto.DoctorProfileResponse;
import com.example.backend.dto.UserProfileResponse;
import com.example.backend.entity.DoctorProfile;
import com.example.backend.entity.User_Entity;
import com.example.backend.repository.DoctorProfileRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class DoctorProfileService {
    public List<UserProfileResponse> getAllPatients() {

        return userRepository.findAll().stream()
                .filter(user ->
                        user.getRoles().stream()
                                .anyMatch(r -> r.getName().equals("ROLE_PATIENT"))
                )
                .map(user -> new UserProfileResponse(
                        user.getId(),
                        user.getEmail(),
                        user.getFullName()
                ))
                .toList();
    }

    public List<DoctorListResponse> getAllDoctors() {
        return repository.findAll()
                .stream()
                .map(profile -> new DoctorListResponse(
                        profile.getId(),
                        profile.getUser().getFullName(),
                        profile.getUser().getEmail(),
                        profile.getSpecialization()
                ))
                .toList();
    }
    private final DoctorProfileRepository repository;
    private final UserRepository userRepository;

    public DoctorProfileService(
            DoctorProfileRepository repository,
            UserRepository userRepository
    ) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    // CREATE
    public DoctorProfileResponse create(
            DoctorProfileRequest request,
            String email
    ) {

        User_Entity doctor = getUser(email);

        if (repository.findByUser(doctor).isPresent()) {
            throw new RuntimeException("Doctor profile already exists");
        }

        DoctorProfile profile = new DoctorProfile();
        profile.setUser(doctor);
        profile.setSpecialization(request.getSpecialization());
        profile.setPhone(request.getPhone());
        profile.setClinicAddress(request.getClinicAddress());
        profile.setYearsOfExperience(request.getYearsOfExperience());

        repository.save(profile);
        return map(profile);
    }

    // READ
    public DoctorProfileResponse get(String email) {

        DoctorProfile profile = repository
                .findByUser(getUser(email))
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        return map(profile);
    }

    // UPDATE
    public DoctorProfileResponse update(
            DoctorProfileRequest request,
            String email
    ) {

        DoctorProfile profile = repository
                .findByUser(getUser(email))
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        profile.setSpecialization(request.getSpecialization());
        profile.setPhone(request.getPhone());
        profile.setClinicAddress(request.getClinicAddress());
        profile.setYearsOfExperience(request.getYearsOfExperience());

        repository.save(profile);
        return map(profile);
    }

    // DELETE
    public void delete(String email) {

        DoctorProfile profile = repository
                .findByUser(getUser(email))
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        repository.delete(profile);
    }

    // =====================
    // Helpers
    // =====================
    private User_Entity getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private DoctorProfileResponse map(DoctorProfile profile) {
        return new DoctorProfileResponse(
                profile.getId(),
                profile.getUser().getEmail(),
                profile.getUser().getFullName(),
                profile.getSpecialization(),
                profile.getPhone(),
                profile.getClinicAddress(),
                profile.getYearsOfExperience()
        );
    }
}
