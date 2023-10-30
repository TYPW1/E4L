package lu.uni.e4l.platform.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
public class VariableValue {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    @NonNull
    @ManyToOne(cascade = CascadeType.ALL)
    private Variable variable;

    @NonNull
    private Double value;
}
