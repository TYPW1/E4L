package lu.uni.e4l.platform.controller;

import lu.uni.e4l.platform.exception.ForbiddenException;
import lu.uni.e4l.platform.model.User;
import lu.uni.e4l.platform.model.UserRole;
import lu.uni.e4l.platform.service.UserManagementService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class UserController {

    private final UserManagementService userManagementService;

    public UserController(UserManagementService userManagementService) {
        this.userManagementService = userManagementService;
    }

    @GetMapping("/users/me")
    @PreAuthorize("isAuthenticated()")
    public User me() {
        return userManagementService.getCurrentUser();
    }

    @PostMapping("/users/me")
    @PreAuthorize("isAuthenticated()")
    public User editProfile(@RequestBody @Valid User user) {
        User currentUser = userManagementService.getCurrentUser();

        if (currentUser.getRoles().contains(UserRole.ANONYMOUS) ||
                (!currentUser.getRoles().contains(UserRole.ADMIN) && currentUser.getId() != user.getId()))
            throw new ForbiddenException("You do not have permission to edit this user's profile");

        return userManagementService.editProfile(user);
    }

    @PostMapping("/signup")
    public User signup(@RequestBody @Valid User user) {
        return userManagementService.createUser(user);
    }
}
