/**
 * User - 用户实体类
 * 对应数据库 `user` 表，包含用户基本信息、角色、状态等字段
 * 使用 MyBatis-Plus 注解实现 ORM 映射，包含逻辑删除和自动填充
 */
package com.travel.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;


/**
 * 用户实体，包含登录认证、角色权限、账号状态等属性
 */
@Data
@TableName("`user`")
public class User {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String username;
    private String password;
    private String nickname;
    private String phone;
    private String email;
    private String avatar;
    private String role;
    private Integer status;
    @TableLogic
    private Integer deleted;
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
