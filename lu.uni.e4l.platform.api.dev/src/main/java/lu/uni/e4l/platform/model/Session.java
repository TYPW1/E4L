package lu.uni.e4l.platform.model;

import lombok.Data;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.List;
import lombok.EqualsAndHashCode;
import com.fasterxml.jackson.annotation.*;

@Data
@Entity
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@id")
public class Session {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    private ZonedDateTime dateTime;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Answer> answers;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name="seminar_fk")
    @JsonBackReference
    private Seminar seminar;

    @ManyToOne
    private Questionnaire questionnaire;

    @ManyToOne
    private User user;

}
