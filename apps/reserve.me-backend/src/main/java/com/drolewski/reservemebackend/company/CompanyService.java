package com.drolewski.reservemebackend.company;

import com.drolewski.reservemebackend.company.db.Company;
import com.drolewski.reservemebackend.company.db.CompanyRepository;
import com.drolewski.reservemebackend.company.model.CompanyListResponse;
import com.drolewski.reservemebackend.company.model.CompanyRequest;
import com.drolewski.reservemebackend.company.model.CompanyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyRepository companyRepository;

    public List<CompanyListResponse> userCompanies(final String phoneNumber) {
        final List<Company> userCompanies = companyRepository.findAllByOwnerId(phoneNumber);
        return userCompanies.stream()
                .map(company -> CompanyListResponse.builder()
                        .address(company.getAddress())
                        .category(company.getCategory())
                        .contact(company.getContact())
                        .name(company.getName())
                        .build())
                .toList();
    }

    public void addCompany(final CompanyRequest companyRequest) {
        companyRepository.save(
                Company.builder()
                        .ownerId(companyRequest.getOwnerId())
                        .category(companyRequest.getCategory())
                        .address(companyRequest.getAddress())
                        .description(companyRequest.getDescription())
                        .contact(companyRequest.getContact())
                        .services(companyRequest.getServices())
                        .name(companyRequest.getName())
                        .openingHours(companyRequest.getOpeningHours())
                        .build()
        );
    }

    public void updateCompany(final CompanyRequest companyRequest) {
        Company company = companyRepository.findFirstByOwnerIdAndName(companyRequest.getOwnerId(), companyRequest.getName());
        if (companyRequest.getName() != null) {
            company = company.toBuilder()
                    .name(companyRequest.getName()).build();
        }
        if (companyRequest.getDescription() != null) {
            company = company.toBuilder()
                    .description(companyRequest.getDescription()).build();
        }
        if (companyRequest.getOpeningHours() != null) {
            company = company.toBuilder()
                    .openingHours(companyRequest.getOpeningHours()).build();
        }
        if (companyRequest.getContact() != null) {
            company = company.toBuilder()
                    .contact(companyRequest.getContact()).build();
        }
        if (companyRequest.getServices() != null) {
            company = company.toBuilder()
                    .services(companyRequest.getServices()).build();
        }
        if (companyRequest.getAddress() != null) {
            company = company.toBuilder()
                    .address(companyRequest.getAddress()).build();
        }
        if (companyRequest.getCategory() != null) {
            company = company.toBuilder()
                    .category(companyRequest.getCategory()).build();
        }
        companyRepository.save(company);
    }

    public CompanyResponse getCompany(final String phoneNumber, final String companyName) {
        final Company company = companyRepository.findFirstByOwnerIdAndName(phoneNumber, companyName);
        return CompanyResponse.builder()
                .name(company.getName())
                .category(company.getCategory())
                .description(company.getDescription())
                .openingHours(company.getOpeningHours())
                .contact(company.getContact())
                .address(company.getAddress())
                .services(company.getServices())
                .category(company.getCategory())
                .build();
    }

    public void deleteCompany(final String phoneNumber, final String companyName) {
        companyRepository.deleteByOwnerIdAndName(phoneNumber, companyName);
    }

    public List<CompanyListResponse> getAllCompanies() {
        return companyRepository.findAll().stream()
                .map(company -> CompanyListResponse.builder()
                        .category(company.getCategory())
                        .contact(company.getContact())
                        .name(company.getName())
                        .address(company.getAddress())
                        .build())
                .toList();
    }

    public CompanyResponse getCompanyByName(final String companyName) {
        final Company company = companyRepository.findFirstByName(companyName);
        return CompanyResponse.builder()
                .name(company.getName())
                .category(company.getCategory())
                .description(company.getDescription())
                .openingHours(company.getOpeningHours())
                .contact(company.getContact())
                .address(company.getAddress())
                .services(company.getServices())
                .category(company.getCategory())
                .build();
    }
}