/**
 * Scenic - 景区实体类
 * 对应 `scenic` 表，包含景区名称、描述、图片、位置坐标、价格、评分等字段
 */
package com.travel.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;


/**
 * 景区实体，记录景区详细信息包括地理位置、票价、评分等
 */
@Data
@TableName("scenic")
public class Scenic {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String name;
    private String description;
    private String coverImage;
    private String images;
    private String location;
    private String province;
    private String city;
    private Double longitude;
    private Double latitude;
    private BigDecimal price;
    private Double rating;
    private String tags;
    private String category;
    private String openTime;
    private Integer status;
    @TableLogic
    private Integer deleted;
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
