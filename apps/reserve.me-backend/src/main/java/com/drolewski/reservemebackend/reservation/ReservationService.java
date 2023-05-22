package com.drolewski.reservemebackend.reservation;

import com.drolewski.reservemebackend.reservation.db.Reservation;
import com.drolewski.reservemebackend.reservation.db.ReservationRepository;
import com.drolewski.reservemebackend.reservation.model.ReservationListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;

    public ReservationListResponse getCompanyReservation(final String companyName) {
        final Reservation reservation = reservationRepository.findFirstByCompanyName(companyName);
        if (reservation != null) {
            return ReservationListResponse
                    .builder()
                    .companyName(reservation.getCompanyName())
                    .reserved(reservation.getReserved())
                    .build();
        }
        return ReservationListResponse
                .builder()
                .build();
    }

}
