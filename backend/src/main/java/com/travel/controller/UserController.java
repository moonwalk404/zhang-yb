/**
 * UserController - 用户控制器
 * 处理用户个人资料、订单、收藏、游记等用户端接口
 */
package com.travel.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.travel.dto.ApiResponse;
import com.travel.entity.TravelOrder;
import com.travel.entity.User;
import com.travel.mapper.UserMapper;
import com.travel.service.OrderService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserMapper userMapper;
    private final OrderService orderService;

    public UserController(UserMapper userMapper, OrderService orderService) {
        this.userMapper = userMapper;
        this.orderService = orderService;
    }

    /** 从 SecurityContext 获取当前登录用户 */
    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof User) {
            return (User) auth.getPrincipal();
        }
        return null;
    }

    /** GET /api/user/profile - 获取个人资料 */
    @GetMapping("/profile")
    public ApiResponse<User> profile() {
        User user = getCurrentUser();
        if (user == null) return ApiResponse.error(401, "未录");
        User u = userMapper.selectById(user.getId());
        if (u != null) u.setPassword(null);
        return ApiResponse.success(u);
    }

    /** GET /api/user/orders - 获取我的订单列表 */
    @GetMapping("/orders")
    public ApiResponse<Page<TravelOrder>> orders(
            @RequestParam(required = false) String status) {
        User user = getCurrentUser();
        if (user == null) return ApiResponse.error(401, "未登录");
        return ApiResponse.success(orderService.getUserOrders(user.getId(), status));
    }

    /** POST /api/user/orders - 创建订单 */
    @PostMapping("/orders")
    public ApiResponse<TravelOrder> createOrder(@RequestBody TravelOrder order) {
        User user = getCurrentUser();
        if (user == null) return ApiResponse.error(401, "未登录");
        order.setUserId(user.getId());
        TravelOrder created = orderService.createOrder(order);
        return ApiResponse.success("下单成功", created);
    }

    /**
     * PUT /api/user/orders/{id} - 更新订单状态（用户端）
     * 用户只能将订单标记为 paid（支付）或 cancelled（取消）
     * 用户不能将订单标记为 completed，需要管理员操作
     */
    @PutMapping("/orders/{id}")
    public ApiResponse<TravelOrder> updateOrder(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        User user = getCurrentUser();
        if (user == null) return ApiResponse.error(401, "未登录");
        String status = body.get("status");
        // 用户只能支付或取消订单，不能自己完成订单（完成需要管理员操作）
        if (status == null || (!status.equals("paid") && !status.equals("cancelled"))) {
            return ApiResponse.error(403, "只能支付或取消订单，完成订单请联系管理员");
        }
        try {
            TravelOrder updated = orderService.updateOrderStatus(id, status, false);
            return ApiResponse.success("订单更成功", updated);
        } catch (IllegalArgumentException e) {
            return ApiResponse.error(404, e.getMessage());
        } catch (IllegalStateException e) {
            return ApiResponse.error(400, e.getMessage());
        } catch (SecurityException e) {
            return ApiResponse.error(403, e.getMessage());
        }
    }
}
