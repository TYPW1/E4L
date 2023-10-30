package lu.uni.e4l.platform.model;

import lombok.Data;
import lu.uni.e4l.platform.model.scale.Scale;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.*;

@Data
@Entity
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@id")
public class Variable {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    @OneToOne(cascade = CascadeType.ALL)
    private Scale scale;

    private String label;

    private String name;

}
