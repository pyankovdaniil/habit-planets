package pyankov.habitplanets.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import pyankov.habitplanets.dto.MessageDTO;
import pyankov.habitplanets.security.UserDetailsImpl;

@RestController
@CrossOrigin
public class UserController {
    @PostMapping("/show-user-info")
    public ResponseEntity<MessageDTO> showUserInfo() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            return new ResponseEntity<>(new MessageDTO(userDetails.getUsername()), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new MessageDTO("You are not authenticated!"), HttpStatus.UNAUTHORIZED);
        }
    }
}
