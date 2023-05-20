package com.drolewski.reservemebackend.company.db;

import com.drolewski.reservemebackend.authorization.db.model.Address;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Data
@Builder(toBuilder = true)
@Document
public class Company {
    @Id
    private String id;

    private String ownerId;

    private String name;
    private String description;
    private Map<WeekDays, OpeningHours> openingHours;
    private Contact contact;
    private List<String> employees;
    private List<Service> services;
    private Address address;
    private List<Opinion> opinions;
}
