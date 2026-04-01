package com.in.Blog_app.service.impl;

import com.in.Blog_app.dto.JwtResponse;
import com.in.Blog_app.dto.LoginRequest;
import com.in.Blog_app.dto.MessageResponse;
import com.in.Blog_app.dto.SignupRequest;
import com.in.Blog_app.entity.ERole;
import com.in.Blog_app.entity.Role;
import com.in.Blog_app.entity.User;
import com.in.Blog_app.repository.RoleRepository;
import com.in.Blog_app.repository.UserRepository;
import com.in.Blog_app.security.jwt.JwtUtils;
import com.in.Blog_app.security.services.UserDetailsImpl;
import com.in.Blog_app.service.AuthService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthServiceImpl(
        AuthenticationManager authenticationManager,
        UserRepository userRepository,
        RoleRepository roleRepository,
        PasswordEncoder passwordEncoder,
        JwtUtils jwtUtils
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities()
            .stream()
            .map(authority -> authority.getAuthority())
            .toList();

        return new JwtResponse(
            jwtUtils.generateJwtToken(authentication),
            userDetails.getId(),
            userDetails.getUsername(),
            userDetails.getEmail(),
            roles
        );
    }

    @Override
    @Transactional
    public MessageResponse registerUser(SignupRequest signupRequest) {
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            throw new RuntimeException("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        User user = new User();
        user.setUsername(signupRequest.getUsername());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        user.setRoles(resolveRoles(signupRequest.getRoles()));

        userRepository.save(user);
        return new MessageResponse("User registered successfully!");
    }

    private Set<Role> resolveRoles(Set<String> requestedRoles) {
        Set<Role> roles = new HashSet<>();

        if (requestedRoles == null || requestedRoles.isEmpty()) {
            roles.add(getRoleOrThrow(ERole.ROLE_USER));
            return roles;
        }

        for (String roleName : requestedRoles) {
            String normalizedRole = roleName == null ? "" : roleName.trim().toLowerCase(Locale.ROOT);
            if ("admin".equals(normalizedRole)) {
                roles.add(getRoleOrThrow(ERole.ROLE_ADMIN));
            } else {
                roles.add(getRoleOrThrow(ERole.ROLE_USER));
            }
        }

        return roles;
    }

    private Role getRoleOrThrow(ERole roleName) {
        return roleRepository.findByName(roleName)
            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
    }
}
