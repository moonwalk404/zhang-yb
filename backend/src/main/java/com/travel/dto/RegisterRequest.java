/**
 * RegisterRequest - 注册请求 DTO
 * 包含用户名、密码、昵称、手机号等字段
 */
package com.travel.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * 注册请求体，包含用户注册所需基本信息
 */
@Data
public class RegisterRequest {
    @NotBlank(message = "用户名不能为空")
    @Size(min = 3, max = 50)
    private String username;
    @NotBlank(message = "密码不能为空")
    @Size(min = 6, max = 100)
    private String password;
    private String nickname;
    private String phone;
}
