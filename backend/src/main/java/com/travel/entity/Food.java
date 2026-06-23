/**
 * Food - 美食实体类
 * 对应 `food` 表，包含美食名称、图片、人均价格、关联景区等字段
 */
package com.travel.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;


/**
 * 美食实体，记录美食信息及其关联的景区
 */
@Data
@TableName("food")
public class Food {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String name;
    private String description;
    private String coverImage;
    private String location;
    private BigDecimal avgPrice;
    private String tags;
    private String scenicName;
    private Long scenicId;
    private String province;
    private String city;
    private Integer status;
    @TableLogic
    private Integer deleted;
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
