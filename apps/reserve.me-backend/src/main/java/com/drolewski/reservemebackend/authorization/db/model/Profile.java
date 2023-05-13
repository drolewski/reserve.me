package com.drolewski.reservemebackend.authorization.db.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
    private String name;
    private String surname;
    private String sex;
    private LocalDate birthday;
}
