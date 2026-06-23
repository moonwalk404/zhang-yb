/**
 * TravelOrder - 订单实体类
 * 对应 `travel_order` 表，包含订单编号、用户ID、景区ID/美食ID、数量、总价、类型、订单状态等字段
 */
package com.travel.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 旅游订单实体，记录用户购买景区门票或美食的订单信息
 */
@Data
@TableName("travel_order")
public class TravelOrder {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String orderNo;
    private Long userId;
    private Long scenicId;
    /** 美食ID，美食订单时使用 */
    private Long foodId;
    /** 订单类型：scenic 景区门票 / food 美食 */
    private String type;
    /** 订单数量 */
    private Integer quantity;
    /** 成人票数量（前端传输字段） */
    @TableField(exist = false)
    private Integer adultTickets;
    /** 儿童票数量（前端传输字段） */
    @TableField(exist = false)
    private Integer childTickets;
    private BigDecimal totalPrice;
    private LocalDate visitDate;
    /** 订单状态：pending 待支付 / paid 已支付 / cancelled 已取消 */
    private String status;
    @TableLogic
    private Integer deleted;
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;

    // 前端传输/展示字段，不映射到数据库
    @TableField(exist = false)
    private String scenicName;
    @TableField(exist = false)
    private String foodName;
    @TableField(exist = false)
    private String coverImage;
    @TableField(exist = false)
    private String location;
    @TableField(exist = false)
    private String phone;
    @TableField(exist = false)
    private String username;
}
