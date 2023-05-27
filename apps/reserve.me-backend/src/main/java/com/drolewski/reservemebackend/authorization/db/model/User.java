package com.drolewski.reservemebackend.authorization.db.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder(toBuilder = true)
@Document
@CompoundIndex(def = "{'account.phoneNumber': 1}", unique = true)
public class User {
    @Id
    private String id;

    private Profile profile;
    private Account account;
    private Address address;
}
