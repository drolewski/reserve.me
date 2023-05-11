package com.drolewski.reservemebackend.authorization.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RegisterRequest {
    private String phoneNumber;
}
