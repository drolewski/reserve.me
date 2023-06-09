package com.drolewski.reservemebackend.company.db;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CompanyRepository extends MongoRepository<Company, String> {
    List<Company> findAllByOwnerId(final String phoneNumber);

    Company findFirstByOwnerIdAndName(final String phoneNumber, final String name);

    void deleteByOwnerIdAndName(final String phoneNumber, final String name);

    Company findFirstByName(final String companyName);

}
