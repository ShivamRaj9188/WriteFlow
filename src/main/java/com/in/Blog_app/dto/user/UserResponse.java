package com.in.Blog_app.dto.user;

import java.util.Set;

public record UserResponse(
        Long id,
        String username,
        String email,
        boolean enabled,
        Set<String> roles
) {
}
