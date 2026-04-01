package com.in.Blog_app.service;

import com.in.Blog_app.dto.CommentDto;

import java.util.List;

public interface CommentService {
    CommentDto createComment(CommentDto commentDto, Long postId, Long userId);
    void deleteComment(Long commentId);
    List<CommentDto> getCommentsByPostId(Long postId);
}
