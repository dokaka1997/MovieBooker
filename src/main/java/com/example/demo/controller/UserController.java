package com.example.demo.controller;

import com.example.demo.model.entity.FilmEntity;
import com.example.demo.model.request.UserRequest;
import com.example.demo.model.response.ListFilmResponse;
import com.example.demo.model.response.UserResponse;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create-account")
    public ResponseEntity<UserResponse> addUser(@RequestBody UserRequest userRequest) {
        return ResponseEntity.ok(userService.createUser(userRequest));
    }

    @GetMapping("/get-all-film")
    public ResponseEntity<List<ListFilmResponse>> getAllFilm() {
        return ResponseEntity.ok(userService.getListFilm());
    }


    @GetMapping("/get-film-by-id/{id}")
    public ResponseEntity<FilmEntity> getFilmById(@RequestParam Long id) {
        return ResponseEntity.ok(userService.geFilmById(id));
    }

//    @PostMapping("/create-account")
//    public ResponseEntity<UserResponse> addUser(@RequestBody UserRequest userRequest) {
//        return ResponseEntity.ok(userService.createUser(userRequest));
//    }
}
