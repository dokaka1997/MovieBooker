package com.example.demo.repository;

import com.example.demo.model.entity.RoleEntity;
import com.example.demo.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    List<UserEntity> findByUsername(String username);

    Optional<UserEntity> findAllByUsernameAndPassword(String username, String password);

    List<UserEntity> findAllByRoleEntity(RoleEntity roleEntity);
}
