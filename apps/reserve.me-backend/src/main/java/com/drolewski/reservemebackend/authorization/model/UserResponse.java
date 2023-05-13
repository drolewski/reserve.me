package com.drolewski.reservemebackend.authorization.model;

import com.drolewski.reservemebackend.authorization.db.model.Address;
import com.drolewski.reservemebackend.authorization.db.model.Profile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private String userName;
    private String phoneNumber;
    private Profile profile;
    private Address address;
}
