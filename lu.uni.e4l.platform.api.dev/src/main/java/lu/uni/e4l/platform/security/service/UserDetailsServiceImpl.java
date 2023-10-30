package lu.uni.e4l.platform.security.service;

import lu.uni.e4l.platform.service.UserManagementService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserManagementService userManagementService;

    public UserDetailsServiceImpl(UserManagementService userManagementService) {
        this.userManagementService = userManagementService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userManagementService.getUserByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }
}
