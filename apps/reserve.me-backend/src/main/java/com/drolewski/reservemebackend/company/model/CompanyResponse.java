package com.drolewski.reservemebackend.company.model;

import com.drolewski.reservemebackend.authorization.db.model.Address;
import com.drolewski.reservemebackend.company.db.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CompanyResponse {
    private String name;
    private List<String> category;
    private String description;
    private List<OpeningHours> openingHours;
    private Contact contact;
    private List<Service> services;
    private Address address;
}
