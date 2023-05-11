package com.drolewski.reservemebackend.authorization.db.model;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder(toBuilder = true)
public class Profile {
    private String name;
    private String surname;
    private String sex;
    private LocalDate birthday;
}
