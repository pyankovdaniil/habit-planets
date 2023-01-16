package pyankov.habitplanets.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "user", schema = "public")
@Getter
@Setter
public class User {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "full_name")
    @NotEmpty(message = "Имя пользователя не должно быть пустым!")
    @Size(min = 3, max = 40, message = "Имя пользователя должно быть от 3 до 40 символов!")
    private String fullName;

    @Column(name = "email")
    @Email(message = "Введите корректный email!")
    @NotEmpty(message = "Email пользователя не должен быть пустым!")
    @Size(min = 6, max = 45, message = "Email пользователя должен быть от 6 до 45 символов!")
    private String email;

    @Column(name = "username")
    @NotEmpty(message = "Юзернейм пользователя не должен быть пустым!")
    @Size(min = 3, max = 20, message = "Юзернейм пользователя должен быть от 3 до 20 символов!")
    private String username;

    @Column(name = "password")
    @NotEmpty(message = "Пароль пользователя не должен быть пустым!")
    private String password;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "owner_id")
    private List<Planet> planets;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", planets=" + planets +
                '}';
    }
}
