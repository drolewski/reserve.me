package com.drolewski.reservemebackend.reservation.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
public class DeleteReservationRequest {
    private String ownerPhoneNumber;
    private String companyName;
    private LocalDate date;
    private LocalTime start;
    private LocalTime end;
    private String serviceName;
}
