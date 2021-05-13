package com.example.demo.service;

import com.example.demo.model.entity.FilmEntity;
import com.example.demo.model.entity.RoomEntity;
import com.example.demo.model.entity.TicketEntity;
import com.example.demo.model.entity.UserEntity;
import com.example.demo.model.request.AddRoomRequest;
import com.example.demo.model.response.RoomResponse;

import java.util.List;

public interface ManagerService {
    FilmEntity addFilm(FilmEntity filmEntity);

    Boolean deleteFilm(Long id);

    RoomEntity room(AddRoomRequest roomEntity);

    Boolean deleteRoom(Long id);

    UserEntity user(UserEntity userEntity);

    Boolean deleteUser(Long id);

    List<UserEntity> getAllEmployee();

    Integer getAllTicket();

    List<FilmEntity> getAllFilm();

    List<RoomResponse> getAllRoom();
}
