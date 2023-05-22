package com.drolewski.reservemebackend.reservation.model;

import com.drolewski.reservemebackend.reservation.db.Reserved;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReservationListResponse {
    private String companyName;
    private List<Reserved> reserved;
}
