package lu.uni.e4l.platform.security;

import com.auth0.jwt.exceptions.JWTVerificationException;
import lu.uni.e4l.platform.model.User;
import lu.uni.e4l.platform.security.service.JWTService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.util.StringUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    private static final String TOKEN_PREFIX = "Bearer ";
    private static final String AUTH_HEADER = "Authorization";

    private final JWTService jwtService;

    public JWTAuthorizationFilter(AuthenticationManager authenticationManager,
                                  JWTService jwtService) {
        super(authenticationManager);
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws IOException, ServletException {

        String header = request.getHeader(AUTH_HEADER);

        if (header == null || !StringUtils.startsWithIgnoreCase(header, TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }

        try {
            User user = jwtService.verify(header.replace(TOKEN_PREFIX, ""));

            SecurityContextHolder.getContext()
                    .setAuthentication(new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities()));

        } catch (JWTVerificationException e) {
            response.sendError(401, e.getMessage());
            return;
        }

        chain.doFilter(request, response);
    }
}
