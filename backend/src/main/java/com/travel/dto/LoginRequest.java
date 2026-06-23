/**
 * LoginRequest - 登录请求 DTO
 * 包含用户名和密码，使用 Bean Validation 校验
 */
package com.travel.dto;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * 登录请求体，包含用户名和密码
 */
@Data
public class LoginRequest {
    @NotBlank(message = "用户名不能为空")
    private String username;
    @NotBlank(message = "密码不能为空")
    private String password;
}
