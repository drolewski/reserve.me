package com.drolewski.reservemebackend.reservation.model;

import com.drolewski.reservemebackend.reservation.db.Reserved;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class ReservationRequest {
    private String companyName;
    private Reserved reserved;
}
