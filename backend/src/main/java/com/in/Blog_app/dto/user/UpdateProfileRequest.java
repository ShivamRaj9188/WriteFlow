package com.in.Blog_app.dto.user;

import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

public record UpdateProfileRequest(
        @Size(max = 100, message = "Name must not exceed 100 characters")
        String name,
        
        @Size(max = 500, message = "Profile Image URL must not exceed 500 characters")
        @URL(message = "Profile Image URL must be a valid URL if provided")
        String profileImageUrl
) {
}
