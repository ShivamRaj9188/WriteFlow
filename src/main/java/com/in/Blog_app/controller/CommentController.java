package com.in.Blog_app.controller;

import com.in.Blog_app.dto.CommentDto;
import com.in.Blog_app.security.services.UserDetailsImpl;
import com.in.Blog_app.service.CommentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts/{postId}/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping
    public ResponseEntity<List<CommentDto>> getCommentsByPostId(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getCommentsByPostId(postId));
    }

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<CommentDto> createComment(
            @PathVariable Long postId,
            @Valid @RequestBody CommentDto commentDto,
            @AuthenticationPrincipal UserDetailsImpl userDetails
    ) {
        return new ResponseEntity<>(commentService.createComment(commentDto, postId, userDetails.getId()), HttpStatus.CREATED);
    }

    @DeleteMapping("/{commentId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }
}
