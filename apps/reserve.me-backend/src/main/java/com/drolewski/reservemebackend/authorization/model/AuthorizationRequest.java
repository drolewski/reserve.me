package com.drolewski.reservemebackend.authorization.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
public class AuthorizationRequest {
    private String phoneNumber;
    private String token;
    private OffsetDateTime requestTime;
}
