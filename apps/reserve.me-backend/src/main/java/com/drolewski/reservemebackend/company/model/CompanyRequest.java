package com.drolewski.reservemebackend.company.model;


import com.drolewski.reservemebackend.authorization.db.model.Address;
import com.drolewski.reservemebackend.company.db.Contact;
import com.drolewski.reservemebackend.company.db.OpeningHours;
import com.drolewski.reservemebackend.company.db.Service;
import com.drolewski.reservemebackend.company.db.WeekDays;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
public class CompanyRequest {
    @NotNull
    @Pattern(regexp = "^\\d+$", message = "Invalid phone number")
    private String ownerId;
    @NotNull
    private String name;
    private String description;
    private Map<WeekDays, OpeningHours> openingHours;
    private Contact contact;
    private List<String> employees;
    private List<Service> services;
    private Address address;
}
