package com.drolewski.reservemebackend.company.model;

import com.drolewski.reservemebackend.authorization.db.model.Address;
import com.drolewski.reservemebackend.company.db.Contact;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CompanyListResponse {
    private String name;
    private List<String> category;
    private Contact contact;
    private Address address;
}
