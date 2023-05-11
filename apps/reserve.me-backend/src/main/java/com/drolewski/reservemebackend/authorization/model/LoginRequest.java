package com.drolewski.reservemebackend.authorization.model;

import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginRequest {
    @Pattern(regexp = "^\\d+$", message = "Invalid phone number")
    private String phoneNumber;
}
