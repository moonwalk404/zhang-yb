/**
 * OrderService - 订单服务
 * 处理订单创建、查询、支付、状态更新等业务逻辑
 *
 * 订单状态流转规则：
 *   pending → paid      (用户支付)
 *   pending → cancelled (用户取消)
 *   paid    → completed (管理员确认完成)
 *   paid    → cancelled (管理员取消)
 *   只有管理员能将 paid 订单标记为 completed
 */
package com.travel.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.travel.entity.Scenic;
import com.travel.entity.TravelOrder;
import com.travel.mapper.ScenicMapper;
import com.travel.entity.Food;
import com.travel.mapper.FoodMapper;
import com.travel.mapper.TravelOrderMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Service
public class OrderService {
    private final TravelOrderMapper orderMapper;
    private final ScenicMapper scenicMapper;
    private final FoodMapper foodMapper;

    /** 允许的状态流转映射：当前状态 -> 可转换到的状态集合 */
    private static final Map<String, Set<String>> ALLOWED_TRANSITIONS = Map.of(
        "pending",   Set.of("paid", "cancelled"),
        "paid",      Set.of("completed", "cancelled"),
        "completed", Set.of(),
        "cancelled", Set.of()
    );

    public OrderService(TravelOrderMapper orderMapper, ScenicMapper scenicMapper, FoodMapper foodMapper) {
        this.orderMapper = orderMapper;
        this.scenicMapper = scenicMapper;
        this.foodMapper = foodMapper;
    }

    /**
     * 创建订单，生成唯一订单号，默认状态为 pending（待支付）
     */
    public TravelOrder createOrder(TravelOrder order) {
        order.setOrderNo("T" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"))
                + UUID.randomUUID().toString().substring(0, 6).toUpperCase());
        // 数量：优先使用前端传入的 quantity，否则从 adultTickets/childTickets 计算
        if (order.getQuantity() == null || order.getQuantity() == 0) {
            int qty = (order.getAdultTickets() != null ? order.getAdultTickets() : 0)
                    + (order.getChildTickets() != null ? order.getChildTickets() : 0);
            order.setQuantity(qty > 0 ? qty : 1);
        }
        // 新创建订单状态为 pending（待支付）
        if (order.getStatus() == null || order.getStatus().isEmpty()) {
            order.setStatus("pending");
        }
        orderMapper.insert(order);
        return order;
    }

    /**
     * 用户查询自己的订单列表，自动填充景区/美食关联信息
     */
    public Page<TravelOrder> getUserOrders(Long userId, String status) {
        var qw = new LambdaQueryWrapper<TravelOrder>()
                .eq(TravelOrder::getUserId, userId);
        if (status != null && !status.isEmpty() && !status.equals("all")) {
            qw.eq(TravelOrder::getStatus, status);
        }
        qw.orderByDesc(TravelOrder::getCreateTime);
        Page<TravelOrder> page = orderMapper.selectPage(new Page<>(1, 50), qw);

        // 用景区/美食数据丰富订单
        for (TravelOrder order : page.getRecords()) {
            enrichOrder(order);
        }
        return page;
    }

    /**
     * 更新订单状态，带流转校验
     * @param id     订单ID
     * @param status 目标状态
     * @param isAdmin 是否为管理员操作（管理员可以完成订单）
     * @return 更新后的订单
     * @throws IllegalStateException 如果状态流转不合法
     */
    public TravelOrder updateOrderStatus(Long id, String status, boolean isAdmin) {
        TravelOrder order = orderMapper.selectById(id);
        if (order == null) {
            throw new IllegalArgumentException("订单不存在");
        }

        String currentStatus = order.getStatus();
        Set<String> allowed = ALLOWED_TRANSITIONS.getOrDefault(currentStatus, Set.of());

        // 检查状态流转是否合法
        if (!allowed.contains(status)) {
            throw new IllegalStateException(
                String.format("不允许将订单从 %s 变更为 %s", currentStatus, status));
        }

        // 只有管理员才能将订单标记为 completed
        if ("completed".equals(status) && !isAdmin) {
            throw new SecurityException("只有管理员才能完成订单");
        }

        order.setStatus(status);
        orderMapper.updateById(order);
        return order;
    }

    /**
     * 管理员专用：确认完成订单
     * 只有当订单状态为 paid 时才能完成
     */
    public TravelOrder adminCompleteOrder(Long id) {
        TravelOrder order = orderMapper.selectById(id);
        if (order == null) {
            throw new IllegalArgumentException("订单不存在");
        }
        if (!"paid".equals(order.getStatus())) {
            throw new IllegalStateException("只有已支付的订单才能标记为完成，当前状态：" + order.getStatus());
        }
        order.setStatus("completed");
        orderMapper.updateById(order);
        return order;
    }

    /**
     * 为订单填充关联的景区/美食/用户信息
     */
    private void enrichOrder(TravelOrder order) {
        if ("food".equals(order.getType())) {
            if (order.getFoodId() != null) {
                Food food = foodMapper.selectById(order.getFoodId());
                if (food != null) {
                    order.setFoodName(food.getName());
                    order.setCoverImage(food.getCoverImage());
                }
            }
        } else {
            if (order.getScenicId() != null) {
                Scenic scenic = scenicMapper.selectById(order.getScenicId());
                if (scenic != null) {
                    order.setScenicName(scenic.getName());
                    order.setCoverImage(scenic.getCoverImage());
                    order.setLocation(scenic.getLocation());
                }
            }
        }
    }
}
