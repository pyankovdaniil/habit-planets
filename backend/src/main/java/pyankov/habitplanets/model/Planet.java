package pyankov.habitplanets.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import pyankov.habitplanets.model.util.PlanetType;

import java.util.List;

@Entity
@Table(name = "planet")
@Getter
@Setter
public class Planet {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    @NotEmpty(message = "Название планеты не должно быть пустым!")
    @Size(min = 2, max = 20, message = "Название планеты должно быть от 3 до 30 символов!")
    private String name;

    @Column(name = "description")
    @Size(min = 5, max = 100, message = "Описание планеты должно быть от 5 до 100 символов!")
    private String description;

    @Column(name = "planet_type")
    @NotEmpty(message = "Тип планеты не может быть пустым!")
    @Enumerated(value = EnumType.STRING)
    private PlanetType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    private User user;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "planet_id")
    private List<Habit> habits;
}
