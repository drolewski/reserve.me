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
                        .employees(companyRequest.getEmployees())
                        .services(companyRequest.getServices())
                        .name(companyRequest.getName())
                        .openingHours(companyRequest.getOpeningHours())
                        .build()
        );
    }

    public void updateCompany(final CompanyRequest companyRequest) {
        final Company company = companyRepository.findFirstByOwnerIdAndName(companyRequest.getOwnerId(), companyRequest.getName());
        if (companyRequest.getName() != null) {
            company.toBuilder()
                    .name(companyRequest.getName());
        }
        if (companyRequest.getDescription() != null) {
            company.toBuilder()
                    .description(companyRequest.getDescription());
        }
        if (companyRequest.getOpeningHours() != null) {
            company.toBuilder()
                    .openingHours(companyRequest.getOpeningHours());
        }
        if (companyRequest.getContact() != null) {
            company.toBuilder()
                    .contact(companyRequest.getContact());
        }
        if (companyRequest.getEmployees() != null) {
            company.toBuilder()
                    .employees(companyRequest.getEmployees());
        }
        if (companyRequest.getServices() != null) {
            company.toBuilder()
                    .services(companyRequest.getServices());
        }
        if (companyRequest.getAddress() != null) {
            company.toBuilder()
                    .address(companyRequest.getAddress());
        }
        if (companyRequest.getCategory() != null) {
            company.toBuilder()
                    .category(companyRequest.getCategory());
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
                .employees(company.getEmployees())
                .address(company.getAddress())
                .opinions(company.getOpinions())
                .services(company.getServices())
                .opinions(company.getOpinions())
                .category(company.getCategory())
                .build();
    }

    public void deleteCompany(final String phoneNumber, final String companyName) {
        companyRepository.deleteByOwnerIdAndName(phoneNumber, companyName);
    }

}