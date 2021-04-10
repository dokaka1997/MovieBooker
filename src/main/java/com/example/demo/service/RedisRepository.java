package com.example.demo.service;

import com.example.demo.model.User;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public interface RedisRepository {
    User save(User user);

    User update(User user);

    Map<String, User> findAll();

    Boolean delete(String id);

    User findById(String id);
}
