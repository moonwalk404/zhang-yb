/**
 * ApiResponse - 统一 API 响应类
 * 封装所有接口的返回结果，包含状态码、消息和数据
 * 提供 success() 和 error() 静态工厂方法以统一响应格式
 */
package com.travel.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 统一响应 DTO，包裹所有接口返回结果
 */
@Data @NoArgsConstructor @AllArgsConstructor
public class ApiResponse<T> {
    private int code;
    private String message;
    private T data;
    public static <T> ApiResponse<T> success(T data) { return new ApiResponse<>(200, "操作成功", data); }
    public static <T> ApiResponse<T> success(String msg, T data) { return new ApiResponse<>(200, msg, data); }
    public static <T> ApiResponse<T> error(int code, String msg) { return new ApiResponse<>(code, msg, null); }
    public static <T> ApiResponse<T> error(String msg) { return new ApiResponse<>(500, msg, null); }
}
