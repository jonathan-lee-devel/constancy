package io.jonathanlee.organizationservice.config;

import io.jonathanlee.commonlib.profile.ApplicationProfile;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@Profile(ApplicationProfile.PRODUCTION)
public class SecurityProductionConfig {

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry ->
            authorizationManagerRequestMatcherRegistry.anyRequest().permitAll());

    http.oauth2ResourceServer(httpSecurityOAuth2ResourceServerConfigurer ->
        httpSecurityOAuth2ResourceServerConfigurer.jwt(jwtConfigurer -> {}));

    return http.build();
  }

}
