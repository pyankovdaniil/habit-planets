package pyankov.habitplanets.validation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import pyankov.habitplanets.model.User;
import pyankov.habitplanets.repository.UserRepository;

import java.util.Optional;

@Component
public class UserValidator implements Validator {
    private final UserRepository userRepository;

    @Autowired
    public UserValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return User.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        User user = (User) target;
        Optional<User> userOptional = userRepository.findUserByUsername(user.getUsername());

        if (userOptional.isPresent()) {
            errors.rejectValue("username", "",
                    "Юзернейм '" + user.getUsername() + "' занят :( Попробуйте другой!");
        }
    }
}
