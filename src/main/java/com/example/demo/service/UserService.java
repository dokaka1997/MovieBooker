package com.example.demo.service;

import com.example.demo.model.request.UserRequest;
import com.example.demo.model.response.UserResponse;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    UserResponse createUser(UserRequest userRequest);

}
