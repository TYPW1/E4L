package lu.uni.e4l.platform.security.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lu.uni.e4l.platform.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;

@Service
public class JWTService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration-time}")
    private long expirationTime;

    public String generateToken(Authentication authentication) throws JsonProcessingException {
        User user = (User) authentication.getPrincipal();

        return JWT.create()
                .withClaim("user", new ObjectMapper().writeValueAsString(user))
                .withExpiresAt(new Date(System.currentTimeMillis() + expirationTime))
                .sign(Algorithm.HMAC512(secret));
    }

    public User verify(String token) throws IOException {
        String user = JWT.require(Algorithm.HMAC512(secret))
                .build()
                .verify(token)
                .getClaim("user").asString();

        return new ObjectMapper().readValue(user, User.class);
    }
}
