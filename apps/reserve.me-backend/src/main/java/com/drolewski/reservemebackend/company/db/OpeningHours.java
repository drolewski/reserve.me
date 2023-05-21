package com.drolewski.reservemebackend.company.db;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OpeningHours {
    private WeekDay weekDay;
    private LocalTime open;
    private LocalTime close;
}
