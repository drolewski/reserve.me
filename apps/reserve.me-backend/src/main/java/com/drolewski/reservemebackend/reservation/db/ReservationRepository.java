package com.drolewski.reservemebackend.reservation.db;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReservationRepository extends MongoRepository<Reservation, String> {
    Reservation findFirstByCompanyName(final String companyName);
}
