package com.example.demo.service.impl;

import com.example.demo.model.User;
import com.example.demo.service.RedisService;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@Repository
public class RedisServiceImpl implements RedisService {

    private RedisTemplate<String, User> redisTemplate;

    private HashOperations hashOperations;

    public RedisServiceImpl(RedisTemplate<String, User> redisTemplate) {
        this.redisTemplate = redisTemplate;
        hashOperations = redisTemplate.opsForHash();
    }

    @Override
    public User save(User user) {
        hashOperations.put("USER", user.getId(), user);
        return user;
    }

    @Override
    public Map<String, User> findAll() {
        return hashOperations.entries("USER");
    }

    @Override
    public User update(User user) {
        hashOperations.put("USER", user.getId(), user);
        return user;
    }

    @Override
    public Boolean delete(String id) {
        hashOperations.delete("USER", id);
        return true;
    }

    @Override
    public User findById(String id) {
        return (User) hashOperations.get("USER", id);
    }
}
