package com.example.demo.service.impl;

import com.example.demo.exception.AccountExistedException;
import com.example.demo.model.entity.FilmEntity;
import com.example.demo.model.entity.RoleEntity;
import com.example.demo.model.entity.UserEntity;
import com.example.demo.model.request.UserRequest;
import com.example.demo.model.response.ListFilmResponse;
import com.example.demo.model.response.UserResponse;
import com.example.demo.repository.FilmRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    UserRepository userRepository;
    RoleRepository roleRepository;
    FilmRepository filmRepository;

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
        userEntity.setName(userRequest.getName());
        userEntity.setAge(userRequest.getAge());
        userRepository.save(userEntity);

        userResponse.setEmail(userEntity.getEmail());
        userResponse.setPassword(userEntity.getPassword());
        userResponse.setUsername(userEntity.getUsername());
        userResponse.setId(userEntity.getId());

        return userResponse;
    }

    @Override
    public List<ListFilmResponse> getListFilm() {
        List<ListFilmResponse> listFilmResponses = new ArrayList<>();
        List<FilmEntity> filmEntities = filmRepository.findAll();

        for (FilmEntity filmEntity : filmEntities) {
            ListFilmResponse listFilmResponse = new ListFilmResponse();
            listFilmResponse.setId(filmEntity.getId());
            listFilmResponse.setName(filmEntity.getName());
            listFilmResponses.add(listFilmResponse);
        }
        return listFilmResponses;
    }

    @Override
    public FilmEntity geFilmById(Long id) {
        return filmRepository.getOne(id);
    }
}
