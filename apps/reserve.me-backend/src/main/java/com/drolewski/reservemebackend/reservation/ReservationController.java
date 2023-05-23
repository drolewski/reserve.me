package com.drolewski.reservemebackend.reservation;

import com.drolewski.reservemebackend.reservation.model.ReservationListResponse;
import com.drolewski.reservemebackend.reservation.model.ReservationRequest;
import com.drolewski.reservemebackend.reservation.model.UserReservationListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("reservation")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @GetMapping("{companyName}")
    public ResponseEntity<ReservationListResponse> getCompanyReservation(@PathVariable final String companyName) {
        return ResponseEntity.ok(reservationService.getCompanyReservation(companyName));
    }

    @PostMapping
    public ResponseEntity<Void> reserve(@RequestBody final ReservationRequest reservationRequest) {
        reservationService.reserve(reservationRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping("{ownerPhoneNumber}")
    public ResponseEntity<List<UserReservationListResponse>> getUserReservation(@PathVariable final String ownerPhoneNumber) {
        return ResponseEntity.ok(reservationService.getUserReservation(ownerPhoneNumber));
    }

}
