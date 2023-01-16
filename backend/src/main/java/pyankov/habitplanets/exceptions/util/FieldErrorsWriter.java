package pyankov.habitplanets.exceptions.util;

import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.List;

@Component
public class FieldErrorsWriter {
    public String writeFieldErrors(BindingResult bindingResult) {
        StringBuilder stringBuilder = new StringBuilder();
        List<FieldError> fieldErrors = bindingResult.getFieldErrors();
        for (FieldError error : fieldErrors) {
            stringBuilder.append(error.getField())
                    .append("-").append(error.getDefaultMessage())
                    .append(";");
        }

        return stringBuilder.toString();
    }
}
