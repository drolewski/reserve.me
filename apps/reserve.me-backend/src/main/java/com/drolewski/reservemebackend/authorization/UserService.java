package com.drolewski.reservemebackend.authorization;

import com.drolewski.reservemebackend.authorization.db.UserRepository;
import com.drolewski.reservemebackend.authorization.db.model.Account;
import com.drolewski.reservemebackend.authorization.db.model.User;
import com.drolewski.reservemebackend.authorization.model.*;
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
import java.util.Optional;

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
                        .userName(registerRequest.getUserName())
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

    UserResponse user(final String phoneNumber) {
        log.info("Get user data by phone number: [phoneNumber={}]", phoneNumber);
        final User user = userRepository.findFirstByAccount_PhoneNumber(phoneNumber);
        return Optional.ofNullable(user)
                .map(this::userResponse)
                .orElse(UserResponse.builder().build());
    }

    void updateUser(final String phoneNumber, final UpdateUserRequest userRequest) {
        log.info("Update user data by phone number: [phoneNumber={}]", phoneNumber);
        final User user = userRepository.findFirstByAccount_PhoneNumber(phoneNumber);
        final User.UserBuilder updatedUser = user.toBuilder();
        if (userRequest.getAddress() != null) {
            updatedUser.address(userRequest.getAddress());
        }
        if (userRequest.getProfile() != null) {
            updatedUser.profile(userRequest.getProfile());
        }
        userRepository.save(updatedUser.build());
    }

    private boolean validateAuthorization(final AuthorizationRequest authorizationRequest, final User user) {
        return validateToken(authorizationRequest, user) && validateExpirationTime(authorizationRequest, user);
    }

    private boolean validateExpirationTime(final AuthorizationRequest authorizationRequest, final User user) {
        return authorizationRequest.getRequestTime().toLocalDateTime().isBefore(user.getAccount().getPasswordExpirationTime());
    }

    private boolean validateToken(final AuthorizationRequest authorizationRequest, final User user) {
        return authorizationRequest.getAuthorizationCode().equals(user.getAccount().getTmpPassword());
    }

    private LocalDateTime currentDateTime() {
        return Instant.now().atOffset(ZoneOffset.of(TIME_ZONE)).toLocalDateTime();
    }

    private UserResponse userResponse(final User user) {
        return UserResponse.builder()
                .userName(user.getAccount().getUserName())
                .phoneNumber(user.getAccount().getPhoneNumber())
                .address(user.getAddress())
                .profile(user.getProfile())
                .build();
    }
}
