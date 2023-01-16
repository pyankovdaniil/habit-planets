package pyankov.habitplanets.exceptions.util;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class UserExceptionResponse {
    private String message;
    private LocalDateTime localDateTime;
}
