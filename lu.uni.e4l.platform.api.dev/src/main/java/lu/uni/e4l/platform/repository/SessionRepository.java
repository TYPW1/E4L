package lu.uni.e4l.platform.repository;

import lu.uni.e4l.platform.model.Session;
import org.springframework.data.repository.CrudRepository;

public interface SessionRepository extends CrudRepository<Session, Long> {
}
