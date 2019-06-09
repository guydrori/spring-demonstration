package app.config;

import app.auth.MySavedRequestAwareAuthenticationSuccessHandler;
import app.auth.RestAuthenticationEntryPoint;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;


/**
 * This class defines the Spring Security configuration for the web application.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    /**
     * Defines what queries should be used for verifying users and loading their permissions, in addition to the data source and the method of processing passwords.
     * @param auth the AuthenticationManagerBuilder to configure
     */
    @Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication().passwordEncoder(PASSWORD_ENCODER).withUser("test").password(PASSWORD_ENCODER.encode("test")).roles("USER");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        http.cors()
//                .and().csrf().disable()
//                .exceptionHandling()
//                .authenticationEntryPoint(new RestAuthenticationEntryPoint())
//                .and()
//                .authorizeRequests()
//                .anyRequest().authenticated()
//                .and()
//                .formLogin()
//                .successHandler(new MySavedRequestAwareAuthenticationSuccessHandler())
//                .failureHandler(new SimpleUrlAuthenticationFailureHandler())
//                .and()
//                .logout();
        http.cors()
                .and().csrf().disable()
                .exceptionHandling()
                .and().authorizeRequests().anyRequest().permitAll();
    }
}
