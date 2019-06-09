package app.auth;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * A class used to return a 401 error code for unauthorized requests.
 *
 * Source: https://www.baeldung.com/securing-a-restful-web-service-with-spring-security
 */
public final class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {


    @Override
    public void commence(
            final HttpServletRequest httpServletRequest,
            final HttpServletResponse httpServletResponse,
            final AuthenticationException e) throws IOException, ServletException {
        httpServletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED,"Unauthorized");
    }
}
