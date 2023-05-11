package com.drolewski.reservemebackend.authorization.token;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Slf4j
@Service
public class LoggerAuthorizationTokenGenerator implements AuthorizationTokenGenerator {

    private static final int UPPER_BOUND = 1000000;
    private static final int LOWER_BOUND = 100000;

    private final SecureRandom sr = new SecureRandom();

    @Override
    public String generate() {
        final int token = sr.nextInt(LOWER_BOUND, UPPER_BOUND);
        log.info("Authorization Token: {}", token);
        return String.valueOf(token);
    }

}
