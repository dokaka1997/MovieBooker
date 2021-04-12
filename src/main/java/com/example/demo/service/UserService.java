package com.example.demo.service;

import com.example.demo.model.request.UserRequest;
import com.example.demo.model.response.UserResponse;

public interface UserService {

    UserResponse createUser(UserRequest userRequest);

}
