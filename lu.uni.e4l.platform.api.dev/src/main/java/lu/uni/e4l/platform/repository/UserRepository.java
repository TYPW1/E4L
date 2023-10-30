package lu.uni.e4l.platform.repository;

import lu.uni.e4l.platform.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByEmail(String email);
}
