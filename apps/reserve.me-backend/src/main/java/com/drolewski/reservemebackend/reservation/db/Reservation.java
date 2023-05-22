package com.drolewski.reservemebackend.reservation.db;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Builder(toBuilder = true)
@Document
public class Reservation {
    @Id
    private String id;

    @Indexed(unique = true)
    private String companyName;
    private List<Reserved> reserved;
}
