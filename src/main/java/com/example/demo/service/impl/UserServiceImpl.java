package com.example.demo.service.impl;

import com.example.demo.exception.AccountExistedException;
import com.example.demo.model.entity.*;
import com.example.demo.model.request.OrderTicketRequest;
import com.example.demo.model.request.UpdateUserRequest;
import com.example.demo.model.request.UserRequest;
import com.example.demo.model.response.ListFilmResponse;
import com.example.demo.model.response.TicketResponse;
import com.example.demo.model.response.UserResponse;
import com.example.demo.repository.*;
import com.example.demo.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    UserRepository userRepository;
    RoleRepository roleRepository;
    FilmRepository filmRepository;
    RoomRepository roomRepository;
    TicketRepository ticketRepository;

    @Override
    public UserResponse createUser(UserRequest userRequest) {

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

        return userResponse(userEntity);
    }

    @Override
    public List<FilmEntity> getListFilm() {
        return filmRepository.findAll();
    }

    @Override
    public FilmEntity geFilmById(Long id) {
        FilmEntity filmEntity = new FilmEntity();
        if (filmRepository.findById(id).isPresent()) {
            filmEntity = filmRepository.findById(id).get();
        }
        return filmEntity;
    }

    @Override
    public UserResponse updateUser(UpdateUserRequest updateUserRequest) {
        UserEntity userEntity = userRepository.getOne(updateUserRequest.getId());
        userEntity.setAge(updateUserRequest.getAge());
        userEntity.setName(updateUserRequest.getName());
        userEntity.setPassword(updateUserRequest.getPassword());
        userEntity.setEmail(updateUserRequest.getEmail());
        userRepository.save(userEntity);
        return userResponse(userEntity);
    }

    @Override
    public TicketResponse order(OrderTicketRequest orderTicketRequest) {
        UserEntity userEntity = userRepository.findById(orderTicketRequest.getCustomerName()).get();
        FilmEntity filmEntity = filmRepository.getOne(orderTicketRequest.getFilm());
        RoomEntity roomEntity = roomRepository.getOne(orderTicketRequest.getRoom());
        TicketResponse ticketResponse = new TicketResponse();
        ticketResponse.setCustomerName(userEntity.getName());
        ticketResponse.setFilm(filmEntity.getName());
        ticketResponse.setOrderDate(orderTicketRequest.getOrderDate());
        ticketResponse.setRoom(roomEntity.getName());
        ticketResponse.setPrice(filmEntity.getPrice());
        ticketResponse.setSeatsNumber(orderTicketRequest.getSeatsNumber());
        ticketResponse.setPayment(orderTicketRequest.isPayment());

        TicketEntity ticketEntity = new TicketEntity();
        ticketEntity.setNumberSeats(ticketResponse.getSeatsNumber());
        ticketEntity.setPayment(ticketResponse.isPayment());
        ticketEntity.setPrice(String.valueOf(filmEntity.getPrice()));
        ticketEntity.setTimeStart(ticketResponse.getTimeStart());
        ticketEntity.setFilm(filmEntity);
        ticketEntity.setRoom(roomEntity);
        ticketEntity.setUser(userEntity);
        ticketRepository.save(ticketEntity);
        return ticketResponse;
    }

    private UserResponse userResponse(UserEntity userEntity) {
        UserResponse userResponse = new UserResponse();
        userResponse.setEmail(userEntity.getEmail());
        userResponse.setPassword(userEntity.getPassword());
        userResponse.setUsername(userEntity.getUsername());
        userResponse.setId(userEntity.getId());
        userResponse.setAge(userEntity.getAge());
        userResponse.setName(userEntity.getName());
        return userResponse;
    }
}
