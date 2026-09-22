    package com.debugmind.backend.security;
    import com.debugmind.backend.util.JwtUtil;
    import lombok.RequiredArgsConstructor;
    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.http.HttpMethod;
    import org.springframework.security.config.annotation.web.builders.HttpSecurity;
    import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
    import org.springframework.security.config.http.SessionCreationPolicy;
    import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.security.web.SecurityFilterChain;
    import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
    import org.springframework.web.cors.CorsConfiguration;
    import org.springframework.web.cors.CorsConfigurationSource;
    import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
    import com.debugmind.backend.repository.UserRepository;
    import org.springframework.security.core.userdetails.UserDetails;
    import org.springframework.security.core.userdetails.UserDetailsService;
    import org.springframework.security.core.userdetails.UsernameNotFoundException;

    import java.util.List;

    @Configuration
    @EnableWebSecurity
    @RequiredArgsConstructor
    public class SecurityConfig {

        private final JwtUtil jwtUtil;

        @Bean
        public SecurityFilterChain securityFilterChain(
                HttpSecurity http,
                JwtAuthenticationFilter jwtAuthenticationFilter
        ) throws Exception {

            http
                    .csrf(csrf -> csrf.disable())

                    .cors(cors ->
                            cors.configurationSource(
                                    corsConfigurationSource()
                            )
                    )

                    .sessionManagement(session ->
                            session.sessionCreationPolicy(
                                    SessionCreationPolicy.STATELESS
                            )
                    )

                    .authorizeHttpRequests(auth -> auth
                            .requestMatchers(
                                    HttpMethod.OPTIONS,
                                    "/**"
                            ).permitAll()

                            .requestMatchers(
                                    "/api/test",
                                    "/api/auth/register",
                                    "/api/auth/login"
                            ).permitAll()

                            .anyRequest().authenticated()
                    )

                    .addFilterBefore(
                            jwtAuthenticationFilter,
                            UsernamePasswordAuthenticationFilter.class
                    );

            return http.build();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }

        @Bean
        public JwtAuthenticationFilter jwtAuthenticationFilter() {
            return new JwtAuthenticationFilter(jwtUtil);
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {

            CorsConfiguration configuration =
                    new CorsConfiguration();

            configuration.setAllowedOrigins(List.of(
                    "http://localhost:5173",
                    "http://localhost:5174"
            ));

            configuration.setAllowedMethods(List.of(
                    "GET",
                    "POST",
                    "PUT",
                    "DELETE",
                    "OPTIONS"
            ));

            configuration.setAllowedHeaders(List.of(
                    "Authorization",
                    "Content-Type",
                    "Accept"
            ));

            configuration.setAllowCredentials(true);

            UrlBasedCorsConfigurationSource source =
                    new UrlBasedCorsConfigurationSource();

            source.registerCorsConfiguration(
                    "/**",
                    configuration
            );

            return source;
        }
        @Bean
        public UserDetailsService userDetailsService(UserRepository userRepository) {

            return email -> userRepository.findByEmail(email)
                    .map(user -> org.springframework.security.core.userdetails.User
                            .withUsername(user.getEmail())
                            .password(user.getPassword())
                            .roles("USER")
                            .build()
                    )
                    .orElseThrow(() ->
                            new UsernameNotFoundException("User not found"));
        }
    }