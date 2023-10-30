package lu.uni.e4l.platform.model.scale;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Data
@Entity
@DiscriminatorValue("interval")
@EqualsAndHashCode(callSuper=true)
public class IntervalScale extends Scale {

    private Double minValue;
    private boolean minValueInclusive;

    private Double maxValue;
    private boolean maxValueInclusive;

    @Column(name = "`precision`")
    private Double precision;

    @Override
    public boolean isValidInput(Double value) {
        return ((minValueInclusive && minValue <= value) || (!minValueInclusive && minValue < value))
                && ((maxValueInclusive && maxValue >= value) || (!maxValueInclusive && maxValue > value));
    }
}
