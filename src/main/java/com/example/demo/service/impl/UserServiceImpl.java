package com.example.demo.service.impl;

import com.example.demo.exception.AccountExistedException;
import com.example.demo.model.entity.RoleEntity;
import com.example.demo.model.entity.UserEntity;
import com.example.demo.model.request.UserRequest;
import com.example.demo.model.response.UserResponse;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Override
    public UserResponse createUser(UserRequest userRequest) {
        UserResponse userResponse = new UserResponse();

        if (!userRepository.findByUsername(userRequest.getUsername()).isEmpty()) {
            throw new AccountExistedException(userRequest.getUsername());
        }
        UserEntity userEntity = new UserEntity();
        RoleEntity roleEntity = roleRepository.getOne(userRequest.getRole());

        userEntity.setEmail(userRequest.getEmail());
        userEntity.setPassword(userRequest.getPassword());
        userEntity.setRoleEntity(roleEntity);
        userEntity.setUsername(userRequest.getUsername());
        userRepository.save(userEntity);

        userResponse.setEmail(userEntity.getEmail());
        userResponse.setPassword(userEntity.getPassword());
        userResponse.setUsername(userEntity.getUsername());
        userResponse.setId(userEntity.getId());

        return userResponse;
    }
}
