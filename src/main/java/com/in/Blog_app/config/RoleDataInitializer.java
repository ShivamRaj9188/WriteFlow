package com.in.Blog_app.config;

import com.in.Blog_app.entity.ERole;
import com.in.Blog_app.entity.Role;
import com.in.Blog_app.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RoleDataInitializer {

    @Bean
    CommandLineRunner initializeRoles(RoleRepository roleRepository) {
        return args -> {
            ensureRoleExists(roleRepository, ERole.ROLE_USER);
            ensureRoleExists(roleRepository, ERole.ROLE_ADMIN);
        };
    }

    private void ensureRoleExists(RoleRepository roleRepository, ERole roleName) {
        roleRepository.findByName(roleName)
            .orElseGet(() -> roleRepository.save(new Role(null, roleName)));
    }
}
