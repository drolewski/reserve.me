package com.drolewski.reservemebackend.company.model;


import com.drolewski.reservemebackend.authorization.db.model.Address;
import com.drolewski.reservemebackend.company.db.Contact;
import com.drolewski.reservemebackend.company.db.OpeningHours;
import com.drolewski.reservemebackend.company.db.Service;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class CompanyRequest {
    @NotNull
    @Pattern(regexp = "^\\d+$", message = "Invalid phone number")
    private String ownerId;
    @NotNull
    private String name;
    private String description;
    @NotNull
    private List<String> category;
    private Address address;
    private Contact contact;
    private List<OpeningHours> openingHours;
    private List<Service> services;

}
