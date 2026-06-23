/**
 * Guide - 攻略实体类
 * 对应 `guide` 表，包含攻略标题、内容、封面图、作者、点赞数、收藏数等字段
 */
package com.travel.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;


/**
 * 旅游攻略实体，用于存储用户发布的旅游攻略文章
 */
@Data
@TableName("guide")
public class Guide {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String title;
    private String content;
    private String coverImage;
    private String author;
    private Long scenicId;
    private String scenicName;
    private String tags;
    private Integer likes;
    private Integer favorites;
    private Integer views;
    private Integer status;
    @TableLogic
    private Integer deleted;
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
