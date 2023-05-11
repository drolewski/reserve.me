package com.drolewski.reservemebackend.authorization.db;


import com.drolewski.reservemebackend.authorization.db.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    User findFirstByAccount_PhoneNumber(final String phoneNumber);
}
