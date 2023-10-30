package lu.uni.e4l.platform.repository;

import lu.uni.e4l.platform.model.Questionnaire;
import org.springframework.data.repository.CrudRepository;

public interface QuestionnaireRepository extends CrudRepository<Questionnaire, Long> {
    Questionnaire findByName(String name);
}
