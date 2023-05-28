package com.drolewski.reservemebackend.company;

import com.drolewski.reservemebackend.company.model.CompanyListResponse;
import com.drolewski.reservemebackend.company.model.CompanyRequest;
import com.drolewski.reservemebackend.company.model.CompanyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("company")
public class CompanyController {
    private final CompanyService companyService;

    @GetMapping("{phoneNumber}")
    public ResponseEntity<List<CompanyListResponse>> userCompanies(@PathVariable final String phoneNumber) {
        return ResponseEntity.ok(companyService.userCompanies(phoneNumber));
    }

    @PostMapping
    public ResponseEntity<Void> addCompany(@RequestBody final CompanyRequest companyRequest) {
        companyService.addCompany(companyRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("update")
    public ResponseEntity<Void> updateCompany(@RequestBody final CompanyRequest companyRequest) {
        companyService.updateCompany(companyRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping("{phoneNumber}/{companyName}")
    public ResponseEntity<CompanyResponse> getCompany(@PathVariable final String phoneNumber, @PathVariable final String companyName) {
        return ResponseEntity.ok(companyService.getCompany(phoneNumber, companyName));
    }

    @DeleteMapping("{phoneNumber}/{companyName}")
    public ResponseEntity<Void> deleteCompany(@PathVariable final String phoneNumber, @PathVariable final String companyName) {
        companyService.deleteCompany(phoneNumber, companyName);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<CompanyListResponse>> getAllCompanies() {
        return ResponseEntity.ok(companyService.getAllCompanies());
    }

    @GetMapping("name/{companyName}")
    public ResponseEntity<CompanyResponse> getCompanyByName(@PathVariable final String companyName) {
        return ResponseEntity.ok(companyService.getCompanyByName(companyName));
    }

}
