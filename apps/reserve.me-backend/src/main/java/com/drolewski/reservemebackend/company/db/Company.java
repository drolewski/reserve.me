package com.drolewski.reservemebackend.company.db;

import com.drolewski.reservemebackend.authorization.db.model.Address;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Builder(toBuilder = true)
@Document
public class Company {
    @Id
    private String id;

    private String ownerId;

    private List<String> category;
    @Indexed(unique = true)
    private String name;
    private String description;
    private List<OpeningHours> openingHours;
    private Contact contact;
    private List<String> employees;
    private List<Service> services;
    private Address address;
}
