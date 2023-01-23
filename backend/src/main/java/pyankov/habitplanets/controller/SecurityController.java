package pyankov.habitplanets.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import pyankov.habitplanets.dto.AuthenticationDTO;
import pyankov.habitplanets.dto.MessageDTO;
import pyankov.habitplanets.dto.UserDTO;
import pyankov.habitplanets.dto.util.UserDTOConverter;
import pyankov.habitplanets.exceptions.IncorrectUserException;
import pyankov.habitplanets.exceptions.util.FieldErrorsWriter;
import pyankov.habitplanets.model.User;
import pyankov.habitplanets.security.JWTUtil;
import pyankov.habitplanets.security.UserDetailsImpl;
import pyankov.habitplanets.service.UserDetailsService;
import pyankov.habitplanets.service.UserRegistrationService;
import pyankov.habitplanets.validation.UserValidator;

@RestController
@CrossOrigin
public class SecurityController {
    private final UserRegistrationService userRegistrationService;
    private final UserDetailsService userDetailsService;
    private final UserDTOConverter userDTOConverter;
    private final UserValidator userValidator;
    private final FieldErrorsWriter fieldErrorsWriter;
    private final JWTUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public SecurityController(UserRegistrationService userRegistrationService,
                              UserDetailsService userDetailsService, UserDTOConverter userDTOConverter,
                              UserValidator userValidator,
                              FieldErrorsWriter fieldErrorsWriter, JWTUtil jwtUtil,
                              AuthenticationManager authenticationManager) {
        this.userRegistrationService = userRegistrationService;
        this.userDetailsService = userDetailsService;
        this.userDTOConverter = userDTOConverter;
        this.userValidator = userValidator;
        this.fieldErrorsWriter = fieldErrorsWriter;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    @GetMapping("/check-username/{username}")
    public ResponseEntity<MessageDTO> checkUsernameInDatabase(@PathVariable("username") String username) {
        if (userRegistrationService.isUsernameInDatabase(username)) {
            return new ResponseEntity<>(new MessageDTO("Found"), HttpStatus.OK);
        }

        return new ResponseEntity<>(new MessageDTO("Not found"), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<MessageDTO> registerNewUser(@RequestBody @Valid UserDTO userDTO,
                                                      BindingResult bindingResult) {
        User user = userDTOConverter.convertToUser(userDTO);
        userValidator.validate(user, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new IncorrectUserException(fieldErrorsWriter.writeFieldErrors(bindingResult));
        }
        userRegistrationService.registerUser(user);
        String token = jwtUtil.generateToken(user.getUsername(), user.getFullName(), user.getEmail());

        return new ResponseEntity<>(new MessageDTO(token), HttpStatus.OK);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<MessageDTO> signIn(@RequestBody @Valid AuthenticationDTO authenticationDTO) {
        UsernamePasswordAuthenticationToken authInputToken
                = new UsernamePasswordAuthenticationToken(authenticationDTO.getUsername(),
                authenticationDTO.getPassword());

        try {
            authenticationManager.authenticate(authInputToken);
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>(new MessageDTO("Incorrect credentials"), HttpStatus.BAD_REQUEST);
        }

        UserDetailsImpl userDetails =
                (UserDetailsImpl) userDetailsService.loadUserByUsername(authenticationDTO.getUsername());
        User user = userDetails.getUser();
        String token = jwtUtil.generateToken(user.getUsername(), user.getFullName(), user.getEmail());
        return new ResponseEntity<>(new MessageDTO(token), HttpStatus.OK);
    }
}
