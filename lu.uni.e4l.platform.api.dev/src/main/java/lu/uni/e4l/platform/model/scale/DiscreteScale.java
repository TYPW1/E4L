package lu.uni.e4l.platform.model.scale;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@DiscriminatorValue("discrete")
@EqualsAndHashCode(callSuper=true)
public class DiscreteScale extends Scale {

    @OneToMany(cascade = CascadeType.ALL)
    private List<AllowedOption> allowedOptions;

    @Override
    public boolean isValidInput(Double value) {
        return allowedOptions.stream()
                .anyMatch(option -> option.matches(value));
    }
}
