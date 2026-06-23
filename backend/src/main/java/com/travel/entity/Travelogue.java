/**
 * Travelogue - 游记（UGC）实体类
 * 对应 `travelogue` 表，用于存储用户发布的游记图文内容
 */
package com.travel.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;


/**
 * UGC 游记实体，用户发布的游记图文
 */
@Data
@TableName("travelogue")
public class Travelogue {
    @TableId(type = IdType.AUTO)
    private Long id;
    private Long userId;
    private String username;
    private String avatar;
    private String title;
    private String content;
    private String images;
    private String location;
    private Long scenicId;
    private String scenicName;
    private Integer likes;
    private Integer views;
    private Integer status;
    @TableLogic
    private Integer deleted;
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
