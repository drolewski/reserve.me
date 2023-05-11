package com.drolewski.reservemebackend.exception;

import com.mongodb.MongoWriteException;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.stream.Collectors;

import static com.drolewski.reservemebackend.exception.ApiErrorCode.UNIQUE_PROPERTY;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(MongoWriteException.class)
    ResponseEntity<Object> mongoUniqueIndexExceptionHandler() {
        final var apiError = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, UNIQUE_PROPERTY, UNIQUE_PROPERTY.getErrorMessage());
        return buildResponseEntity(apiError);
    }

    @ExceptionHandler(ApiRuntimeException.class)
    protected ResponseEntity<Object> apiRuntimeExceptionHandler(ApiRuntimeException ex) {
        final var apiError = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, ex.getApiErrorCode(), ex.getDebugMessage());
        return buildResponseEntity(apiError);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        final String errorMessage = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.joining(", "));
        final var apiError = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, ApiErrorCode.REQUEST_VALIDATION_ERROR, errorMessage);
        return buildResponseEntity(apiError);
    }

    private ResponseEntity<Object> buildResponseEntity(ApiError apiError) {
        return new ResponseEntity<>(apiError, apiError.getInternalStatus());
    }

}
