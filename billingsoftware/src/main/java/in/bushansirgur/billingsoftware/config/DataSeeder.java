package in.bushansirgur.billingsoftware.config;

import in.bushansirgur.billingsoftware.entity.UserEntity;
import in.bushansirgur.billingsoftware.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

/**
 * Data Seeder to automatically create the admin user if it doesn't exist.
 * This ensures successful login in production environments after fresh deployment.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        seedAdminUser();
    }

    private void seedAdminUser() {
        String adminEmail = "admin@example.com";
        Optional<UserEntity> userOptional = userRepository.findByEmail(adminEmail);

        if (userOptional.isPresent()) {
            log.info("Admin user already exists: {}", adminEmail);
        } else {
            UserEntity adminUser = UserEntity.builder()
                    .email(adminEmail)
                    .password(passwordEncoder.encode("admin123"))
                    .role("ADMIN")
                    .name("Admin")
                    .userId(UUID.randomUUID().toString())
                    .build();
            userRepository.save(adminUser);
            log.info("Admin user created successfully: {}", adminEmail);
        }
    }
}
