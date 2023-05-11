package com.drolewski.reservemebackend.exception;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.Instant;
import java.time.ZoneOffset;

import static com.drolewski.reservemebackend.util.ApplicationConstants.TIME_ZONE;

@Data
public class ApiError {

    private String timestamp;

    @JsonIgnore
    private HttpStatus internalStatus;

    private int status;

    private int errorCode;
    private String error;
    private String message;

    private ApiError() {
        timestamp = Instant.now().atOffset(ZoneOffset.of(TIME_ZONE)).toLocalDateTime().toString();
    }

    ApiError(HttpStatus internalStatus) {
        this();
        this.internalStatus = internalStatus;
        this.status = internalStatus.value();
        this.errorCode = ApiErrorCode.UNKNOWN.getErrorCode();
        this.error = ApiErrorCode.UNKNOWN.getErrorMessage();
    }

    ApiError(HttpStatus internalStatus, ApiErrorCode errorCode, String message) {
        this(internalStatus);
        this.errorCode = errorCode.getErrorCode();
        this.error = errorCode.getErrorMessage();
        this.message = message;
    }

}