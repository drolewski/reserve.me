package com.drolewski.reservemebackend.exception;

import com.mongodb.MongoWriteException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static com.drolewski.reservemebackend.exception.ApiErrorCode.UNIQUE_PROPERTY;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MongoWriteException.class)
    ResponseEntity<Object> mongoUniqueIndexExceptionHandler() {
        final var apiError = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, UNIQUE_PROPERTY, UNIQUE_PROPERTY.getErrorMessage());
        return buildResponseEntity(apiError);
    }

    @ExceptionHandler(ApiRuntimeException.class)
    protected ResponseEntity<Object> apiRuntimeExceptionHandler(ApiRuntimeException ex) {
        ApiError apiError = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, ex.getApiErrorCode(), ex.getDebugMessage());
        return buildResponseEntity(apiError);
    }

    private ResponseEntity<Object> buildResponseEntity(ApiError apiError) {
        return new ResponseEntity<>(apiError, apiError.getInternalStatus());
    }

}
