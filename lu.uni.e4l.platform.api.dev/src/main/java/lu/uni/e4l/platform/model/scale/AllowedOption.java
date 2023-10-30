package lu.uni.e4l.platform.model.scale;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
public class AllowedOption {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    @NonNull
    private String name;

    @NonNull
    private Double value;

    public boolean matches(Double value) {
        return this.value.equals(value);
    }
}
