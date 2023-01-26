package pyankov.habitplanets.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.Date;

/**
 * Этот класс генерирует JWT-токен, который нужно отдать клиенту
 * и валидирует токены, которые клиент посылает при запросах
 */
@Component
public class JWTUtil {
    @Value("${jwt_secret}")
    private String secret;

    public String generateToken(String username, String fullName, String email) {
        Date expirationDate = Date.from(ZonedDateTime.now().plusSeconds(15).toInstant());
        return JWT.create()
                .withSubject("User details")
                .withClaim("username", username)
                .withClaim("fullName", fullName)
                .withClaim("email", email)
                .withIssuedAt(new Date())
                .withIssuer("pyankovdaniil")
                .withExpiresAt(expirationDate)
                .sign(Algorithm.HMAC256(secret));
    }

    public String validateTokenAndRetrieveClaim(String token) throws JWTVerificationException {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secret))
                .withSubject("User details")
                .withIssuer("pyankovdaniil")
                .build();

        DecodedJWT decodedJWT = verifier.verify(token);
        return decodedJWT.getClaim("username").asString();
    }
}
