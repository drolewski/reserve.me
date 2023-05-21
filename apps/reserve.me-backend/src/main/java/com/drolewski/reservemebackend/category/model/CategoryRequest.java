package com.drolewski.reservemebackend.category.model;


import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CategoryRequest {
    @NotNull
    private String name;
}
