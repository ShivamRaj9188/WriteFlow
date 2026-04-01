package com.in.Blog_app.service;

import com.in.Blog_app.dto.PostDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostService {
    PostDto createPost(PostDto postDto, Long userId);
    PostDto updatePost(PostDto postDto, Long postId);
    void deletePost(Long postId);
    PostDto getPostById(Long postId);
    Page<PostDto> getAllPosts(Pageable pageable);
}
