package pyankov.habitplanets.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDTO {
    @NotEmpty(message = "Имя пользователя не должно быть пустым!")
    @Size(min = 3, max = 40, message = "Имя пользователя должно быть от 3 до 40 символов!")
    private String fullName;

    @Email
    @NotEmpty(message = "Email пользователя не должен быть пустым!")
    @Size(min = 6, max = 45, message = "Email пользователя должен быть от 6 до 45 символов!")
    private String email;

    @NotEmpty(message = "Юзернейм пользователя не должен быть пустым!")
    @Size(min = 3, max = 20, message = "Юзернейм пользователя должен быть от 3 до 20 символов!")
    private String username;

    @NotEmpty(message = "Пароль пользователя не должен быть пустым!")
    @Size(min = 3, max = 20, message = "Пароль должен быть быть от 3 до 20 символов!")
    private String password;
}
