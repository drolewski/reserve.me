package com.drolewski.reservemebackend.authorization.model;

import com.drolewski.reservemebackend.authorization.db.model.Address;
import com.drolewski.reservemebackend.authorization.db.model.Profile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequest {
    private Profile profile;
    private Address address;
}
