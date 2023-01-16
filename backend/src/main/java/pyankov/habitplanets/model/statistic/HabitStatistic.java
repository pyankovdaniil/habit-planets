package pyankov.habitplanets.model.statistic;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import pyankov.habitplanets.model.Habit;

@Entity
@Table(name = "habit_stats")
@Getter
@Setter
public class HabitStatistic {
    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "max_sequence_ever")
    private int maxSequenceEver;

    @Column(name = "max_sequence_month")
    private int maxSequenceMonth;

    @Column(name = "current_sequence")
    private int currentSequence;

    @OneToOne(mappedBy = "statistic")
    private Habit habit;
}
