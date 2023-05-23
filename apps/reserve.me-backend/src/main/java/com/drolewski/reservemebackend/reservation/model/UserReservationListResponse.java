package com.drolewski.reservemebackend.reservation.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserReservationListResponse {
    private String companyName;
    private LocalDate date;
    private LocalTime start;
    private LocalTime end;
    private String serviceName;
}
