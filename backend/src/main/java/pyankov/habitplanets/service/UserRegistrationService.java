package pyankov.habitplanets.service;

import pyankov.habitplanets.model.User;

public interface UserRegistrationService {
    void registerUser(User user);
    boolean isUsernameInDatabase(String username);
}
