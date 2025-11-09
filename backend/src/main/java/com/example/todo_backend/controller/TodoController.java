package com.example.todo_backend.controller;



import com.example.todo_backend.model.Todo;
import com.example.todo_backend.model.User;
import com.example.todo_backend.repository.TodoRepository;
import com.example.todo_backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

        import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/todos")
public class TodoController {
    private final TodoRepository todoRepo;
    private final UserRepository userRepo;

    public TodoController(TodoRepository todoRepo, UserRepository userRepo) {
        this.todoRepo = todoRepo;
        this.userRepo = userRepo;
    }

    @GetMapping("/{userId}")
    public List<Todo> getUserTodos(@PathVariable Long userId) {
        User user = userRepo.findById(userId).orElseThrow();
        return todoRepo.findByUser(user);
    }

    @PostMapping
    public Todo createTodo(@RequestBody Map<String, String> body) {
        Long userId = Long.valueOf(body.get("userId"));
        User user = userRepo.findById(userId).orElseThrow();

        Todo todo = new Todo();
        todo.setTitle(body.get("title"));
        todo.setDescription(body.get("description"));
        todo.setUser(user);

        return todoRepo.save(todo);
    }

    @PutMapping("/{id}")
    public Todo toggleTodo(@PathVariable Long id) {
        Todo todo = todoRepo.findById(id).orElseThrow();
        todo.setCompleted(!todo.isCompleted());
        return todoRepo.save(todo);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoRepo.deleteById(id);
    }
}
