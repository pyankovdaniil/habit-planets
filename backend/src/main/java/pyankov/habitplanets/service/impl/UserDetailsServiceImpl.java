package pyankov.habitplanets.service.impl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pyankov.habitplanets.model.User;
import pyankov.habitplanets.repository.UserRepository;
import pyankov.habitplanets.security.UserDetailsImpl;
import pyankov.habitplanets.service.UserDetailsService;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> person = userRepository.findUserByUsername(username);
        if (person.isEmpty()) {
            throw new UsernameNotFoundException("User with name " + username + " was not found!");
        }

        return new UserDetailsImpl(person.get());
    }
}
