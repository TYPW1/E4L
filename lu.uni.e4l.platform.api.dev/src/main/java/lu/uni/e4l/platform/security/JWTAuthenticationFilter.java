package lu.uni.e4l.platform.security;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lu.uni.e4l.platform.model.User;
import lu.uni.e4l.platform.security.service.JWTService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager,
                                   JWTService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;

        setAuthenticationFailureHandler(new JWTAuthenticationFailureHandler());
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {

        try {
            User user = new ObjectMapper().readValue(request.getInputStream(), User.class);

            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    user.getEmail(),
                    user.getPassword()
            ));
        } catch (JsonParseException | JsonMappingException e) {
            throw new BadAuthenticationRequestException("Invalid request body");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException {

        String token = jwtService.generateToken(authResult);

        response.setContentType("application/json");
        new ObjectMapper().writeValue(response.getWriter(), token);
    }

    private static class BadAuthenticationRequestException extends AuthenticationException {
        private BadAuthenticationRequestException(String msg) {
            super(msg);
        }
    }
}
