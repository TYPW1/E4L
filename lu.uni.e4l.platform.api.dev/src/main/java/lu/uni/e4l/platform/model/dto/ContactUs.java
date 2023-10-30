package lu.uni.e4l.platform.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ContactUs {
    private String firstName;
    private String lastName;
    private String email;
    private String subject;
    private String message;
}
