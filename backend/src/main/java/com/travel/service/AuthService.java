/**
 * AuthService - 认证服务
 * 处理用户登录、注册业务逻辑
 * 登录时验证密码并生成 JWT Token，注册时加密密码后写入数据库
 */
package com.travel.service;

import com.travel.dto.LoginRequest;
import com.travel.dto.LoginResponse;
import com.travel.dto.RegisterRequest;
import com.travel.entity.User;
import com.travel.mapper.UserMapper;
import com.travel.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserMapper userMapper, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

        /**
     * 登录：验证用户名密码 -> 检查账号状态 -> 生成 JWT
     */
public LoginResponse login(LoginRequest req) {
        User user = userMapper.selectByUsername(req.getUsername());
        if (user == null || !passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("用户名或密码错误");
        }
        if (user.getStatus() != 1) {
            throw new RuntimeException("账号已被禁用");
        }
        String token = jwtUtil.generateToken(user.getId(), user.getUsername(), user.getRole());
        return new LoginResponse(token, user.getRole(), user.getNickname(), user.getId());
    }

        /**
     * 注册：检查用户名唯一性 -> 加密密码 -> 写入数据库
     */
public void register(RegisterRequest req) {
        User exist = userMapper.selectByUsername(req.getUsername());
        if (exist != null) {
            throw new RuntimeException("用户名已存在");
        }
        User user = new User();
        user.setUsername(req.getUsername());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setNickname(req.getNickname() != null ? req.getNickname() : req.getUsername());
        user.setPhone(req.getPhone());
        user.setRole("user");
        user.setStatus(1);
        userMapper.insert(user);
    }
}
