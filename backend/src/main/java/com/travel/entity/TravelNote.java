/**
 * TravelNote - 游记实体类
 * 对应 `travel_note` 表，包含游记标题、内容、封面图、关联景区等字段，支持点赞和浏览统计
 */
package com.travel.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;


/**
 * 游记实体，用户发布的旅游日记，支持点赞和浏览量统计
 */
@Data
@TableName("travel_note")
public class TravelNote {
    @TableId(type = IdType.AUTO)
    private Long id;
    private Long userId;
    private String title;
    private String content;
    private String coverImage;
    private Long scenicId;
    private Integer likes;
    private Integer views;
    @TableLogic
    private Integer deleted;
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
