package com.drolewski.reservemebackend.authorization;

import com.drolewski.reservemebackend.authorization.db.UserRepository;
import com.drolewski.reservemebackend.authorization.db.model.Account;
import com.drolewski.reservemebackend.authorization.db.model.User;
import com.drolewski.reservemebackend.authorization.model.AuthorizationRequest;
import com.drolewski.reservemebackend.authorization.model.LoginRequest;
import com.drolewski.reservemebackend.authorization.model.RegisterRequest;
import com.drolewski.reservemebackend.authorization.token.AuthorizationTokenGenerator;
import com.drolewski.reservemebackend.exception.ApiErrorCode;
import com.drolewski.reservemebackend.exception.ApiRuntimeException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;

import static com.drolewski.reservemebackend.util.ApplicationConstants.TIME_ZONE;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AuthorizationTokenGenerator authorizationTokenGenerator;

    void register(final RegisterRequest registerRequest) {
        final String phoneNumber = registerRequest.getPhoneNumber();
        log.info("Register user with phone number: [phoneNumber={}]", phoneNumber);
        userRepository.save(User.builder()
                .account(Account.builder()
                        .phoneNumber(phoneNumber)
                        .build())
                .build());
    }

    void login(final LoginRequest loginRequest) {
        final String phoneNumber = loginRequest.getPhoneNumber();
        log.info("Login user with phone number: [phoneNumber={}]", phoneNumber);
        final User user = userRepository.findFirstByAccount_PhoneNumber(phoneNumber);
        final String tmpPassword = authorizationTokenGenerator.generate();
        final LocalDateTime expirationTime = currentDateTime().plus(5, ChronoUnit.MINUTES);
        final User userWithToken = user.toBuilder()
                .account(user.getAccount()
                        .toBuilder()
                        .tmpPassword(tmpPassword)
                        .passwordExpirationTime(expirationTime)
                        .build())
                .build();
        userRepository.save(userWithToken);
    }

    void authorize(final AuthorizationRequest authorizationRequest) {
        final String phoneNumber = authorizationRequest.getPhoneNumber();
        log.info("Authorize user with phone number: [phoneNumber={}]", phoneNumber);
        final User user = userRepository.findFirstByAccount_PhoneNumber(phoneNumber);
        if (!validateAuthorization(authorizationRequest, user)) {
            throw new ApiRuntimeException(ApiErrorCode.AUTHORIZATION_ERROR, "User authorization exception");
        }
        final User authorizedUser = user.toBuilder()
                .account(user.getAccount().toBuilder()
                        .tmpPassword(null)
                        .passwordExpirationTime(null)
                        .lastLogin(currentDateTime())
                        .build())
                .build();
        userRepository.save(authorizedUser);
    }

    private boolean validateAuthorization(final AuthorizationRequest authorizationRequest, final User user) {
        return validateToken(authorizationRequest, user) && validateExpirationTime(authorizationRequest, user);
    }

    private boolean validateExpirationTime(final AuthorizationRequest authorizationRequest, final User user) {
        return authorizationRequest.getRequestTime().toLocalDateTime().isBefore(user.getAccount().getPasswordExpirationTime());
    }

    private boolean validateToken(final AuthorizationRequest authorizationRequest, final User user) {
        return authorizationRequest.getToken().equals(user.getAccount().getTmpPassword());
    }

    private LocalDateTime currentDateTime() {
        return Instant.now().atOffset(ZoneOffset.of(TIME_ZONE)).toLocalDateTime();
    }

}
