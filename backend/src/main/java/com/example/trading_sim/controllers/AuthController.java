package com.example.trading_sim.controllers;

import com.example.trading_sim.dtos.UserCredentials;
import com.example.trading_sim.services.JWTService;
import com.example.trading_sim.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final JWTService jwtService;
    private final UserService userService;
    private final AuthenticationManager authManager;
    private final PasswordEncoder encoder;

    public AuthController(JWTService jwtService,
                          UserService userService,
                          AuthenticationManager authManager,
                          PasswordEncoder encoder)
    {
        this.jwtService = jwtService;
        this.userService = userService;
        this.authManager = authManager;
        this.encoder = encoder;
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserCredentials credentials)
    {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(credentials.getUsername(), credentials.getPassword())
        );

        UserDetails userDetails = (UserDetails) auth.getPrincipal();
        String token = jwtService.generateToken(userDetails);

        return ResponseEntity.ok(token);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserCredentials credentials)  // <- add username/password validation
    {
        if (userService.existsByUsername(credentials.getUsername()))
        {
            return new ResponseEntity<>("Username taken!", HttpStatus.CONFLICT);
        }

        credentials.setPassword(encoder.encode(credentials.getPassword()));  // hash password
        userService.createUserWithWallet(credentials);

        return new ResponseEntity<>("User created!", HttpStatus.CREATED);
    }
}
