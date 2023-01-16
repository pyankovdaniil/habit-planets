package pyankov.habitplanets.model.statistic;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import pyankov.habitplanets.model.Habit;
import pyankov.habitplanets.model.util.HabitActionType;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "date_status")
@Getter
@Setter
public class DateStatus {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "status")
    @Enumerated(value = EnumType.STRING)
    @NotEmpty(message = "Выберите действие!")
    private HabitActionType type;

    @ManyToMany(mappedBy = "actions")
    private List<Habit> habits;
}
