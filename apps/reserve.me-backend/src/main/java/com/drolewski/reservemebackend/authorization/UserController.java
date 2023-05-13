package com.drolewski.reservemebackend.authorization;

import com.drolewski.reservemebackend.authorization.model.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("register")
    public ResponseEntity<Void> register(@RequestBody @Valid final RegisterRequest registerRequest) {
        userService.register(registerRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("login")
    public ResponseEntity<Void> login(@RequestBody @Valid final LoginRequest loginRequest) {
        userService.login(loginRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("authorize")
    public ResponseEntity<Void> authorize(@RequestBody @Valid final AuthorizationRequest authorizationRequest) {
        userService.authorize(authorizationRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping("{phoneNumber}")
    public ResponseEntity<UserResponse> user(@PathVariable final String phoneNumber) {
        return ResponseEntity.ok().body(userService.user(phoneNumber));
    }

    @PostMapping("{phoneNumber}")
    public ResponseEntity<Void> updateUser(@PathVariable final String phoneNumber,
                                           @RequestBody @Valid final UpdateUserRequest updateUserRequest) {
        userService.updateUser(phoneNumber, updateUserRequest);
        return ResponseEntity.ok().build();
    }

}
