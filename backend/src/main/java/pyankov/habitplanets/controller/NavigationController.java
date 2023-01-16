package pyankov.habitplanets.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NavigationController {
    @GetMapping("/")
    public String getMainPage() {
        return "Hello there!";
    }
}
