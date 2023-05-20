package com.drolewski.reservemebackend.company.db;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Opinion {
    private String author;
    private OffsetDateTime date;
    private BigDecimal value;
    private Service service;
    private String description;
}
