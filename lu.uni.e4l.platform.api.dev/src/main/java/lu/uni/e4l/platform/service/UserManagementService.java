package lu.uni.e4l.platform.service;

import com.google.common.collect.Sets;
import lu.uni.e4l.platform.exception.BadRequestException;
import lu.uni.e4l.platform.exception.ForbiddenException;
import lu.uni.e4l.platform.exception.NotFoundException;
import lu.uni.e4l.platform.model.User;
import lu.uni.e4l.platform.model.UserRole;
import lu.uni.e4l.platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.Optional;

@Service
public class UserManagementService {

    private final static String ANONYMOUS_USERNAME = "anonymous";

    @Value("${admin.email}")
    private String adminEmail;

    @Value("${admin.password}")
    private String adminPassword;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserManagementService(UserRepository userRepository,
                                 PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User getAnonymousUser() {
        return getUserByEmail(ANONYMOUS_USERNAME).orElseThrow(() -> new NotFoundException("Anonymous user not found"));
    }

    public Optional<User> getUserByEmail(String email) {
        return Optional.ofNullable(userRepository.findByEmail(email));
    }

    public User createUser(User user) {

        if (user.getPassword() == null || user.getEmail() == null
                || user.getPassword().isEmpty() || user.getEmail().isEmpty())
            throw new BadRequestException("Empty email or password");

        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRoles(Collections.singleton(UserRole.USER));
            return userRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new BadRequestException("User with this email is already registered");
        }
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication instanceof AnonymousAuthenticationToken
                || !(authentication.getPrincipal() instanceof User))
            return getAnonymousUser();

        return userRepository.findById(((User) authentication.getPrincipal()).getId())
                .orElseThrow(() -> new ForbiddenException("You've been deleted from the system"));
    }

    public User editProfile(User newUser) {
        User user = userRepository.findById(newUser.getId())
                .orElseThrow(() -> new NotFoundException("User id=" + newUser.getId() + " not found"));

        newUser.setRoles(user.getRoles());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(user.getPassword());

        return userRepository.save(newUser);
    }

    @PostConstruct
    private void createDefaultUsers() {
        if (userRepository.findByEmail(ANONYMOUS_USERNAME) == null)
            userRepository.save(new User(ANONYMOUS_USERNAME, Sets.newHashSet(UserRole.ANONYMOUS)));

        if (userRepository.findByEmail(adminEmail) == null) {
            User admin = new User(adminEmail, Sets.newHashSet(UserRole.ADMIN));
            admin.setPassword(passwordEncoder.encode(adminPassword));
            userRepository.save(admin);
        }
    }
}
