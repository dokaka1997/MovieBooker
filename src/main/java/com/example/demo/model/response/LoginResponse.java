package com.example.demo.model.response;

import com.example.demo.model.entity.RoleEntity;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class LoginResponse {
    private String token;
    RoleEntity roleEntity;
}
