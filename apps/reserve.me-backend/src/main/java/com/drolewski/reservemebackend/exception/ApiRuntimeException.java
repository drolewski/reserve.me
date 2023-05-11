package com.drolewski.reservemebackend.exception;

import lombok.Getter;

@Getter
public class ApiRuntimeException extends RuntimeException {

    private final ApiErrorCode apiErrorCode;

    private final String debugMessage;

    public ApiRuntimeException(ApiErrorCode apiErrorCode, String debugMessage) {
        super(apiErrorCode.getErrorMessage());
        this.apiErrorCode = apiErrorCode;
        this.debugMessage = debugMessage;
    }

}
