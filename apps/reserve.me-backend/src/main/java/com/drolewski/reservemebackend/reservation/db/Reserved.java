package com.drolewski.reservemebackend.reservation.db;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Reserved {
    private String ownerPhoneNumber;
    private LocalDate date;
    private LocalTime start;
    private LocalTime end;
    private String serviceName;
}
