package com.example.trading_sim.controllers;

import com.example.trading_sim.models.User;
import com.example.trading_sim.repositories.UserRepository;
import com.example.trading_sim.services.UserService;
import com.example.trading_sim.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/users")
public class UserController implements ApiController
{
    private final UserService service;

    UserController(UserService service)
    {
        this.service = service;
    }

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<User>> readAll()
    {
        List<User> users = (List<User>) service.findAll();

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<User> readById(@PathVariable Integer id)
    {
        Optional<User> user = service.findById(id);

        if (user.isPresent())
            return new ResponseEntity<>(user.get(), HttpStatus.OK);

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    @ResponseBody
    public ResponseEntity<User> create(@RequestBody User user)
    {
        User savedUser = service.createUserWithWallet(user);

        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @ResponseBody
    public ResponseEntity<User> put(@PathVariable Integer id, @RequestBody User user)
    {
        boolean existedBefore = service.existsById(id);
        user.setId(id);
        User savedUser = service.save(user);

        if (!existedBefore)
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        else
            return new ResponseEntity<>(savedUser, HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<User> deleteById(@PathVariable Integer id)
    {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
