package com.example.demo.service;

import com.example.demo.model.entity.FilmEntity;
import com.example.demo.model.request.OrderTicketRequest;
import com.example.demo.model.request.UpdateUserRequest;
import com.example.demo.model.request.UserRequest;
import com.example.demo.model.response.ListFilmResponse;
import com.example.demo.model.response.TicketResponse;
import com.example.demo.model.response.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest userRequest);

    List<ListFilmResponse> getListFilm();

    FilmEntity geFilmById(Long id);

    UserResponse updateUser(UpdateUserRequest updateUserRequest);

    TicketResponse order(OrderTicketRequest orderTicketRequest);

}
