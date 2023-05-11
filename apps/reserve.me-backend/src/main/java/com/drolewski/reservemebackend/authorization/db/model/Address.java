package com.drolewski.reservemebackend.authorization.db.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder(toBuilder = true)
public class Address {
    private String street;
    private String number;
    private String city;
    private String postCode;
}
