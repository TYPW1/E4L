package lu.uni.e4l.platform.model;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@JsonInclude(JsonInclude.Include.NON_NULL)
@RequiredArgsConstructor
@NoArgsConstructor
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@id")
public class PossibleAnswer {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    @NonNull
    private String name;

    private String image;

    @NonNull
    private String formula;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Variable> variables;

    @OneToMany(mappedBy = "possibleAnswer")
    private List<Answer> answers;

    @ManyToOne
    @JoinColumn(name = "fk_question")
    private Question question;
}
