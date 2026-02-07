package com.example.backend.repository;

import com.example.backend.entity.Role_Entity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role_Entity, Long> {
    Optional<Role_Entity> findByName(String name);
}
