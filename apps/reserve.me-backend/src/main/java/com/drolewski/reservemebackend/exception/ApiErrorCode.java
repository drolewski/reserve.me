package com.drolewski.reservemebackend.exception;


import lombok.Getter;

@Getter
public enum ApiErrorCode {

    UNKNOWN(600, "Unknown API ERROR"),
    UNIQUE_PROPERTY(601, "Unique property error"),
    AUTHORIZATION_ERROR(602, "Authorization error");

    private final String errorMessage;
    private final int errorCode;

    ApiErrorCode(final int errorCode, final String errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

}
