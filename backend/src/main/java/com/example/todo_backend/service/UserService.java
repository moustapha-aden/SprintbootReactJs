package com.example.todo_backend.service;


import com.example.todo_backend.model.User;
import com.example.todo_backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository repo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public User register(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }

    public User login(String email, String password) {
        return repo.findByEmail(email)
                .filter(u -> encoder.matches(password, u.getPassword()))
                .orElse(null);
    }
}
