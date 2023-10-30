package lu.uni.e4l.platform.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.List;
import java.util.Optional;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@id")
public class Questionnaire {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    @NonNull
    private String name;

    @NonNull
    @OneToMany(cascade = {CascadeType.ALL})
    private List<Question> questions;
    
    public Optional<Question> getQuestion(long questionId) {
        return questions.stream()
                .filter(q -> q.getId() == questionId)
                .findAny();
    }
}
