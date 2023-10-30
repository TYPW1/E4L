package lu.uni.e4l.platform.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.Optional;
import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.List;
import javax.validation.constraints.Size;
import com.fasterxml.jackson.annotation.*;

@Data
@Entity
@JsonInclude(JsonInclude.Include.NON_NULL)
@RequiredArgsConstructor
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@id")
public class Seminar {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    private String name;

    private String description;

    private ZonedDateTime createdDateTime;

    private String address;

    // @NonNull
    private ZonedDateTime eventDateTime;

    private String audience;

    private String presenters;

    // @NonNull
    @Column(unique=true, length = 99)
    private String accessCode;

    private SeminarStatus status;

    @OneToMany(mappedBy = "seminar", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Session> sessions;

    public Optional<Session> getSession(long sessionId) {
        return sessions.stream()
                .filter(s -> s.getId() == sessionId)
                .findAny();
    }

    public void addSession(Session session) {
        sessions.add(session);
    }
}
