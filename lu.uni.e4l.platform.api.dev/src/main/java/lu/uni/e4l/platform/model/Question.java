package lu.uni.e4l.platform.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;
import java.util.Optional;
import com.fasterxml.jackson.annotation.*;

@Data
@Entity
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@id")
public class Question {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    private String name;

    private Integer minAnswersNumber;

    private Integer maxAnswersNumber;

    private String detailsFile;

    @OneToMany(cascade = {CascadeType.ALL}, mappedBy = "question")
    private List<PossibleAnswer> possibleAnswers;

    public Optional<PossibleAnswer> getPossibleAnswer(long id) {
        return possibleAnswers.stream()
                .filter(a -> a.getId() == id)
                .findAny();
    }

}
