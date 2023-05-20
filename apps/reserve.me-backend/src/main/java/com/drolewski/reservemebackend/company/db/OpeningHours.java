package com.drolewski.reservemebackend.company.db;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.OffsetTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OpeningHours {
    private OffsetTime open;
    private OffsetTime close;
}
