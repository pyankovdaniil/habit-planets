package pyankov.habitplanets.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import pyankov.habitplanets.model.statistic.DateStatus;
import pyankov.habitplanets.model.statistic.HabitStatistic;

import java.util.List;

@Entity
@Table(name = "habit")
@Getter
@Setter
public class Habit {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    @NotEmpty(message = "Название привычки не должно быть пустым!")
    @Size(min = 3, max = 30, message = "Название привычки должно быть от 3 до 30 символов!")
    private String name;

    @Column(name = "description")
    @Size(min = 5, max = 100, message = "Описание привычки должно быть от 5 до 100 символов!")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "planet_id", referencedColumnName = "id")
    private Planet planet;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id")
    private HabitStatistic statistic;

    @ManyToMany
    @JoinTable(
            name = "habit_action",
            joinColumns = @JoinColumn(name = "habit_id"),
            inverseJoinColumns = @JoinColumn(name = "action_id")
    )
    private List<DateStatus> actions;
}
