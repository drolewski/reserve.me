package com.drolewski.reservemebackend.reservation;

import com.drolewski.reservemebackend.reservation.db.Reservation;
import com.drolewski.reservemebackend.reservation.db.ReservationRepository;
import com.drolewski.reservemebackend.reservation.db.Reserved;
import com.drolewski.reservemebackend.reservation.model.DeleteReservationRequest;
import com.drolewski.reservemebackend.reservation.model.ReservationListResponse;
import com.drolewski.reservemebackend.reservation.model.ReservationRequest;
import com.drolewski.reservemebackend.reservation.model.UserReservationListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public void reserve(final ReservationRequest reservationRequest) {
        final Reservation reservation = Optional.ofNullable(reservationRepository.findFirstByCompanyName(reservationRequest.getCompanyName()))
                .orElse(Reservation.builder()
                        .companyName(reservationRequest.getCompanyName())
                        .reserved(new ArrayList<>())
                        .build());
        reservation.getReserved().add(Reserved.builder()
                .date(reservationRequest.getReserved().getDate())
                .end(reservationRequest.getReserved().getEnd())
                .start(reservationRequest.getReserved().getStart())
                .serviceName(reservationRequest.getReserved().getServiceName())
                .ownerPhoneNumber(reservationRequest.getReserved().getOwnerPhoneNumber())
                .build());
        reservationRepository.save(reservation);
    }

    public List<UserReservationListResponse> getUserReservation(final String ownerPhoneNumber) {
        final List<Reservation> reservations = reservationRepository.findAll();
        final List<UserReservationListResponse> result = new ArrayList<>();
        reservations.forEach(reservation -> reservation.getReserved().stream().filter(reserved -> reserved.getOwnerPhoneNumber().equals(ownerPhoneNumber))
                .forEach(reserved -> result.add(UserReservationListResponse.builder()
                        .companyName(reservation.getCompanyName())
                        .date(reserved.getDate())
                        .start(reserved.getStart())
                        .serviceName(reserved.getServiceName())
                        .build())));
        return result;
    }


    public void delete(final DeleteReservationRequest deleteReservationRequest) {
        final Reservation reservation = reservationRepository.findFirstByCompanyName(deleteReservationRequest.getCompanyName());
        reservation.setReserved(reservation.getReserved().stream()
                .filter(res -> res.getOwnerPhoneNumber().equals(deleteReservationRequest.getOwnerPhoneNumber())
                        && res.getServiceName().equals(deleteReservationRequest.getServiceName())
                        && res.getDate().equals(deleteReservationRequest.getDate())
                        && res.getStart().equals(deleteReservationRequest.getStart())).toList());
        reservationRepository.save(reservation);
    }

}
