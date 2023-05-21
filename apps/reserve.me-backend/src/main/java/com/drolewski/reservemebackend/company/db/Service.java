package com.drolewski.reservemebackend.company.db;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigInteger;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Service {
    private String name;
    private BigInteger price;
    private BigInteger serviceTime;
    private List<WeekDay> weekDays;
    private List<String> employees;
}
