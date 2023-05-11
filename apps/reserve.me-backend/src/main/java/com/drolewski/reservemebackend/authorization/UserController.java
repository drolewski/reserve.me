package com.drolewski.reservemebackend.authorization;

import com.drolewski.reservemebackend.authorization.model.AuthorizationRequest;
import com.drolewski.reservemebackend.authorization.model.LoginRequest;
import com.drolewski.reservemebackend.authorization.model.RegisterRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
