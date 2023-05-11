package com.drolewski.reservemebackend.authorization.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginRequest {
    private String phoneNumber;
}
