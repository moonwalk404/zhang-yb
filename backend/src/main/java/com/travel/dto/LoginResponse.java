/**
 * LoginResponse - 登录响应 DTO
 * 包含 JWT Token、用户角色、昵称、用户ID
 */
package com.travel.dto;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * 登录成功响应，包含 token 和用户基本信息
 */
@Data @AllArgsConstructor
public class LoginResponse {
    private String token;
    private String role;
    private String nickname;
    private Long userId;
}
