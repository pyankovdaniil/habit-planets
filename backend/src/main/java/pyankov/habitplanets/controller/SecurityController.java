package pyankov.habitplanets.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class SecurityController {
    @GetMapping("/sign-up")
    public ResponseEntity<HttpStatus> signUp() {
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/sign-in")
    public ResponseEntity<HttpStatus> signIn() {
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
