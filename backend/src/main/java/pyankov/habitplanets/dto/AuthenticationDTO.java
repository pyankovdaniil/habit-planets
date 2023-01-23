package pyankov.habitplanets.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class AuthenticationDTO {
    @NotEmpty(message = "Юзернейм пользователя не должен быть пустым!")
    @Size(min = 3, max = 20, message = "Юзернейм пользователя должен быть от 3 до 20 символов!")
    private String username;

    @NotEmpty(message = "Пароль пользователя не должен быть пустым!")
    @Size(min = 3, max = 20, message = "Пароль должен быть быть от 3 до 20 символов!")
    private String password;
}
