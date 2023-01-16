package pyankov.habitplanets.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import pyankov.habitplanets.dto.MessageDTO;
import pyankov.habitplanets.dto.UserDTO;
import pyankov.habitplanets.dto.util.UserDTOConverter;
import pyankov.habitplanets.exceptions.IncorrectUserException;
import pyankov.habitplanets.exceptions.util.FieldErrorsWriter;
import pyankov.habitplanets.model.User;
import pyankov.habitplanets.service.UserRegistrationService;
import pyankov.habitplanets.validation.UserValidator;

@RestController
@CrossOrigin
public class RegistrationController {
    private final UserRegistrationService userRegistrationService;
    private final UserDTOConverter userDTOConverter;
    private final UserValidator userValidator;
    private final FieldErrorsWriter fieldErrorsWriter;

    public RegistrationController(UserRegistrationService userRegistrationService,
                                  UserDTOConverter userDTOConverter,
                                  UserValidator userValidator,
                                  FieldErrorsWriter fieldErrorsWriter) {
        this.userRegistrationService = userRegistrationService;
        this.userDTOConverter = userDTOConverter;
        this.userValidator = userValidator;
        this.fieldErrorsWriter = fieldErrorsWriter;
    }

    @GetMapping("/check-username/{username}")
    public ResponseEntity<MessageDTO> checkUsernameInDatabase(@PathVariable("username") String username) {
        System.out.println("Here with username: " + username);
        if (userRegistrationService.isUsernameInDatabase(username)) {
            return new ResponseEntity<>(new MessageDTO("Found"), HttpStatus.OK);
        }

        return new ResponseEntity<>(new MessageDTO("Not found"), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<HttpStatus> registerNewUser(@RequestBody @Valid UserDTO userDTO,
                                                      BindingResult bindingResult) {
        User user = userDTOConverter.convertToUser(userDTO);
        userValidator.validate(user, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new IncorrectUserException(fieldErrorsWriter.writeFieldErrors(bindingResult));
        }
        userRegistrationService.registerUser(user);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
