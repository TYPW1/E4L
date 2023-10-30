package lu.uni.e4l.platform.repository;

import lu.uni.e4l.platform.model.Question;
import org.springframework.data.repository.CrudRepository;

public interface QuestionRepository extends CrudRepository<Question, Long> {
}
