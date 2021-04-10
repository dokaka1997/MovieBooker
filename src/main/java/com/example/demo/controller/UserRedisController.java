package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.RedisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.Map;

@RestController
@RequestMapping("/user/redis")
public class UserRedisController {
    @Autowired
    private RedisRepository redisRepository;


    public void setRedisRepository(RedisRepository redisRepository) {
        this.redisRepository = redisRepository;
    }

    @CrossOrigin
    @PostMapping("/save")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        return ResponseEntity.ok(redisRepository.save(user));
    }

    @GetMapping("/get_all")
    public ResponseEntity<Map<String, User>> getAll() {
        return ResponseEntity.ok(redisRepository.findAll());
    }

    @GetMapping("/get_by_id")
    public ResponseEntity<User> getById(@PathParam("id") String id) {
        return ResponseEntity.ok(redisRepository.findById(id));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> delete(@PathParam("id") String id) {
        return ResponseEntity.ok(redisRepository.delete(id));
    }

    @PutMapping("/update")
    public ResponseEntity<User> update(@RequestBody User user) {
        return ResponseEntity.ok(redisRepository.update(user));
    }
}
