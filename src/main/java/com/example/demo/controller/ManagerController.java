package com.example.demo.controller;

import com.example.demo.model.entity.FilmEntity;
import com.example.demo.model.entity.RoomEntity;
import com.example.demo.model.entity.TicketEntity;
import com.example.demo.model.entity.UserEntity;
import com.example.demo.service.ManagerService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@CrossOrigin
@RestController
@RequestMapping("/manager")
public class ManagerController {
    ManagerService managerService;

    @PostMapping("/film")
    public ResponseEntity<FilmEntity> addFilm(@RequestBody FilmEntity filmEntity) {
        return ResponseEntity.ok(managerService.addFilm(filmEntity));
    }

    @DeleteMapping("/film/{id}")
    public ResponseEntity<Boolean> deleteFilm(@PathVariable Long id) {
        return ResponseEntity.ok(managerService.deleteFilm(id));
    }

    @PostMapping("/room")
    public ResponseEntity<RoomEntity> Room(@RequestBody RoomEntity roomEntity) {
        return ResponseEntity.ok(managerService.room(roomEntity));
    }

    @PostMapping("/employee")
    public ResponseEntity<UserEntity> employee(@RequestBody UserEntity userEntity) {
        return ResponseEntity.ok(managerService.user(userEntity));
    }


    @DeleteMapping("/user/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable Long id) {
        return ResponseEntity.ok(managerService.deleteUser(id));
    }

    @GetMapping("/user")
    public ResponseEntity<List<UserEntity>> getAllEmployee() {
        return ResponseEntity.ok(managerService.getAllEmployee());
    }

    @GetMapping("/ticket")
    public ResponseEntity<List<TicketEntity>> getAllTicket() {
        return ResponseEntity.ok(managerService.getAllTicket());
    }
}
