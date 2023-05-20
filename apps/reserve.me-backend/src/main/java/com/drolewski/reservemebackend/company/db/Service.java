package com.drolewski.reservemebackend.company.db;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigInteger;
import java.time.OffsetTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Service {
    private String name;
    private BigInteger price;
    private OffsetTime startTime;
    private OffsetTime endTime;
    private List<WeekDays> weekDays;
    private List<String> employees;
}
