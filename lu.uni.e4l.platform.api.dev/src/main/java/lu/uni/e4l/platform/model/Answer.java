package lu.uni.e4l.platform.model;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@EqualsAndHashCode(exclude="session")
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@id")
public class Answer {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_session")
    private Session session;

    @OneToMany(cascade = CascadeType.ALL)
    private List<VariableValue> variableValues = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "fk_possible_answer")
    private PossibleAnswer possibleAnswer;
}
