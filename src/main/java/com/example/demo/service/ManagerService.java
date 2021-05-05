package com.example.demo.service;

import com.example.demo.model.entity.FilmEntity;
import com.example.demo.model.entity.RoomEntity;
import com.example.demo.model.entity.TicketEntity;
import com.example.demo.model.entity.UserEntity;

import java.util.List;

public interface ManagerService {
    FilmEntity addFilm(FilmEntity filmEntity);

    Boolean deleteFilm(Long id);

    RoomEntity room(RoomEntity roomEntity);

    UserEntity user(UserEntity userEntity);

    Boolean deleteUser(Long id);

    List<UserEntity> getAllEmployee();

    List<TicketEntity> getAllTicket();
}
