package pyankov.habitplanets.controller.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import pyankov.habitplanets.exceptions.IncorrectUserException;
import pyankov.habitplanets.exceptions.util.UserExceptionResponse;

import java.time.LocalDateTime;

@ControllerAdvice
public class ExceptionHandlerController extends ResponseEntityExceptionHandler {
    @ExceptionHandler(IncorrectUserException.class)
    public ResponseEntity<UserExceptionResponse> handleIncorrectUserException(IncorrectUserException e) {
        UserExceptionResponse response = new UserExceptionResponse(e.getMessage(), LocalDateTime.now());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
