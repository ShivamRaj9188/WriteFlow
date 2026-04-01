package com.in.Blog_app.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PostDto {
    private Long id;
    private String title;
    private String content;
    private UserDto author;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
