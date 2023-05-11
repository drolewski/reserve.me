package com.drolewski.reservemebackend.authorization.db.model;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder(toBuilder = true)
public class Account {
    private String phoneNumber;
    private String tmpPassword;
    private LocalDateTime passwordExpirationTime;
    private LocalDateTime lastLogin;
}
