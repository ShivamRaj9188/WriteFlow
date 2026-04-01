package com.in.Blog_app.service;

import com.in.Blog_app.dto.JwtResponse;
import com.in.Blog_app.dto.LoginRequest;
import com.in.Blog_app.dto.MessageResponse;
import com.in.Blog_app.dto.SignupRequest;

public interface AuthService {

    JwtResponse authenticateUser(LoginRequest loginRequest);

    MessageResponse registerUser(SignupRequest signupRequest);
}
