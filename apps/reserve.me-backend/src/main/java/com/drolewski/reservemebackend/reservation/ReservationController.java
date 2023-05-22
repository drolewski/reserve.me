package com.drolewski.reservemebackend.reservation;

import com.drolewski.reservemebackend.reservation.model.ReservationListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("reservation")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @GetMapping("{companyName}")
    public ResponseEntity<ReservationListResponse> getCompanyReservation(@PathVariable final String companyName) {
        return ResponseEntity.ok(reservationService.getCompanyReservation(companyName));
    }

}
