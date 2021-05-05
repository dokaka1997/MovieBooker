package com.example.demo.service.impl;

import com.example.demo.model.entity.*;
import com.example.demo.repository.FilmRepository;
import com.example.demo.repository.RoomRepository;
import com.example.demo.repository.TicketRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.ManagerService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ManagerServiceImpl implements ManagerService {
    FilmRepository filmRepository;

    RoomRepository roomRepository;

    UserRepository userRepository;

    TicketRepository ticketRepository;

    @Override
    public FilmEntity addFilm(FilmEntity filmEntity) {
        FilmEntity filmEntityResponse = filmRepository.save(filmEntity);
        return filmEntityResponse;
    }

    @Override
    public Boolean deleteFilm(Long id) {
        Optional<FilmEntity> filmEntity = filmRepository.findById(id);
        if (filmEntity.isPresent()) {
            filmRepository.delete(filmEntity.get());
            return true;
        } else {
            return false;
        }
    }

    @Override
    public RoomEntity room(RoomEntity roomEntity) {
        return roomRepository.save(roomEntity);
    }

    @Override
    public UserEntity user(UserEntity userEntity) {
        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setId(2L);
        roleEntity.setName("Employee");
        userEntity.setRoleEntity(roleEntity);
        return userRepository.save(userEntity);
    }

    @Override
    public Boolean deleteUser(Long id) {
        userRepository.deleteById(id);
        return true;
    }

    @Override
    public List<UserEntity> getAllEmployee() {
        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setId(2L);
        roleEntity.setName("Employee");
        return userRepository.findAllByRoleEntity(roleEntity);
    }

    @Override
    public List<TicketEntity> getAllTicket() {
        return ticketRepository.findAll();
    }
}
