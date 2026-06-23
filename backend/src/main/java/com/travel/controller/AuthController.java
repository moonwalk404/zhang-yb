/**
 * AuthController - 认证控制器
 * 处理登录、注册请求，路由前缀 /api/auth
 */
package com.travel.controller;

import com.travel.dto.*;
import com.travel.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;


/**
 * 认证接口，包含登录和注册
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) { this.authService = authService; }

    @PostMapping("/login")
        /**
     * POST /api/auth/login - 登录接口
     */
public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest req) {
        try {
            return ApiResponse.success("登录成功", authService.login(req));
        } catch (RuntimeException e) {
            return ApiResponse.error(401, e.getMessage());
        }
    }

    @PostMapping("/register")
        /**
     * POST /api/auth/register - 注册接口
     */
public ApiResponse<Void> register(@Valid @RequestBody RegisterRequest req) {
        try {
            authService.register(req);
            return ApiResponse.success("注册成功", null);
        } catch (RuntimeException e) {
            return ApiResponse.error(400, e.getMessage());
        }
    }
}
