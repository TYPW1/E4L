package lu.uni.e4l.platform.model.scale;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, property = "type")
public abstract class Scale {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;


    public abstract boolean isValidInput(Double value);
}
