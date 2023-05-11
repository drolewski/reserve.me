package com.drolewski.reservemebackend.authorization.model;

import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
public class AuthorizationRequest {
    @Pattern(regexp = "^\\d+$", message = "Invalid phone number")
    private String phoneNumber;
    @Pattern(regexp = "^\\d{6}$", message = "Invalid token")
    private String token;
    private OffsetDateTime requestTime;
}
