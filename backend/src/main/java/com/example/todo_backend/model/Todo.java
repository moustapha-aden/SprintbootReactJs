package com.example.todo_backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String Description;
    private boolean completed = false;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
