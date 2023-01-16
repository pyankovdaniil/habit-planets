package pyankov.habitplanets.dto.util;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pyankov.habitplanets.dto.UserDTO;
import pyankov.habitplanets.model.User;

@Component
public class UserDTOConverter {
    private final ModelMapper modelMapper;

    @Autowired
    public UserDTOConverter(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public User convertToUser(UserDTO userDTO) {
        return modelMapper.map(userDTO, User.class);
    }
}
