package lu.uni.e4l.platform.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;
import java.util.Optional;

@Data
@Entity
public class ContactFormData {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    private String email;

    private String first_name;

    private String last_name;

    private String message;

    private String subject;


    public String getEmail() {
        return email;
    }

    public String getFirst_name() {
        return first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public String getMessage() {
        return message;
    }

    public String getSubject() {
        return subject;
    }

}
