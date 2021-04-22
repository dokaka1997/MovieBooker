package com.example.demo.controller;

import com.example.demo.model.entity.FilmEntity;
import com.example.demo.model.request.OrderTicketRequest;
import com.example.demo.model.request.UpdateUserRequest;
import com.example.demo.model.request.UserRequest;
import com.example.demo.model.response.ListFilmResponse;
import com.example.demo.model.response.TicketResponse;
import com.example.demo.model.response.UserResponse;
import com.example.demo.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {

    private UserService userService;


    @PostMapping("/create-account")
    public ResponseEntity<UserResponse> addUser(@RequestBody UserRequest userRequest) {
        return ResponseEntity.ok(userService.createUser(userRequest));
    }

    @GetMapping("/get-all-film")
    public ResponseEntity<List<ListFilmResponse>> getAllFilm() {
        return ResponseEntity.ok(userService.getListFilm());
    }


    @GetMapping("/get-film-by-id/{id}")
    public ResponseEntity<FilmEntity> getFilmById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.geFilmById(id));
    }

    @PutMapping("/update-account")
    public ResponseEntity<UserResponse> updateUser(@RequestBody UpdateUserRequest updateUserRequest) {
        return ResponseEntity.ok(userService.updateUser(updateUserRequest));
    }

    @PostMapping("/order")
    public ResponseEntity<TicketResponse> order(@RequestBody OrderTicketRequest updateUserRequest) {
        return ResponseEntity.ok(userService.order(updateUserRequest));
    }
}
