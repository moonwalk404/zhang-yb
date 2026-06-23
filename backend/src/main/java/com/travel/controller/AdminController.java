/**
 * AdminController - 管理员控制器
 * 处理管理端的统计数据、用户管理、景区/美食/攻略/游记/订单的增删改查
 *
 * 管理员独有的权限：将已支付订单标记为"已完成"
 */
package com.travel.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.travel.dto.ApiResponse;
import com.travel.entity.*;
import com.travel.mapper.*;
import com.travel.service.OrderService;
import com.travel.service.UserManageService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final UserManageService userManageService;
    private final OrderService orderService;
    private final TravelOrderMapper orderMapper;
    private final ScenicMapper scenicMapper;
    private final FoodMapper foodMapper;
    private final GuideMapper guideMapper;
    private final TravelogueMapper travelogueMapper;
    private final UserMapper userMapper;

    public AdminController(UserManageService userManageService, OrderService orderService,
                           TravelOrderMapper orderMapper, ScenicMapper scenicMapper,
                           FoodMapper foodMapper, GuideMapper guideMapper,
                           TravelogueMapper travelogueMapper, UserMapper userMapper) {
        this.userManageService = userManageService;
        this.orderService = orderService;
        this.orderMapper = orderMapper;
        this.scenicMapper = scenicMapper;
        this.foodMapper = foodMapper;
        this.guideMapper = guideMapper;
        this.travelogueMapper = travelogueMapper;
        this.userMapper = userMapper;
    }

    // ==================== 仪表盘统计 ====================
    /** GET /api/admin/stats - 获取仪表盘统计数据 */
    @GetMapping("/stats")
    public ApiResponse<Map<String, Object>> stats() {
        Map<String, Object> data = new LinkedHashMap<>();
        data.put("scenicCount", scenicMapper.selectCount(null));
        data.put("userCount", userMapper.selectCount(null));
        data.put("guideCount", guideMapper.selectCount(null));
        data.put("travelogueCount", travelogueMapper.selectCount(null));
        data.put("foodCount", foodMapper.selectCount(null));
        long orderCount = orderMapper.selectCount(null);
        data.put("orderCount", orderCount);
        String today = LocalDate.now().toString();
        LambdaQueryWrapper<TravelOrder> todayQw = new LambdaQueryWrapper<TravelOrder>()
                .apply("DATE(create_time) = {0}", today);
        List<TravelOrder> todayOrders = orderMapper.selectList(todayQw);
        data.put("todayOrders", todayOrders.size());
        data.put("todayRevenue", todayOrders.stream()
                .mapToDouble(o -> o.getTotalPrice() != null ? o.getTotalPrice().doubleValue() : 0).sum());
        return ApiResponse.success(data);
    }

    // ==================== 用户管理 ====================
    /** GET /api/admin/users - 用户列表（分页 + 关键词搜索） */
    @GetMapping("/users")
    public ApiResponse<Page<User>> listUsers(
            @RequestParam(defaultValue = "1") int pageNum,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(required = false) String keyword) {
        Page<User> page = userManageService.page(pageNum, pageSize, keyword);
        page.getRecords().forEach(u -> u.setPassword(null));
        return ApiResponse.success(page);
    }

    /** PUT /api/admin/users/{id}/toggle-status - 切换用户启用/禁用状态 */
    @PutMapping("/users/{id}/toggle-status")
    public ApiResponse<Void> toggleUserStatus(@PathVariable Long id) {
        userManageService.toggleStatus(id);
        return ApiResponse.success("状态更新成功", null);
    }

    /** DELETE /api/admin/users/{id} - 删除用户 */
    @DeleteMapping("/users/{id}")
    public ApiResponse<Void> deleteUser(@PathVariable Long id) {
        userManageService.toggleStatus(id);
        return ApiResponse.success("删除成功", null);
    }

    // ==================== 景区管理 ====================
    @PostMapping("/scenics")
    public ApiResponse<Scenic> createScenic(@RequestBody Scenic scenic) {
        scenicMapper.insert(scenic);
        return ApiResponse.success("添加成功", scenic);
    }

    @PutMapping("/scenics/{id}")
    public ApiResponse<Scenic> updateScenic(@PathVariable Long id, @RequestBody Scenic scenic) {
        scenic.setId(id);
        scenicMapper.updateById(scenic);
        return ApiResponse.success("更新成功", scenicMapper.selectById(id));
    }

    @DeleteMapping("/scenics/{id}")
    public ApiResponse<Void> deleteScenic(@PathVariable Long id) {
        scenicMapper.deleteById(id);
        return ApiResponse.success("删除成功", null);
    }

    // ==================== 美食管理 ====================
    @PostMapping("/food")
    public ApiResponse<Food> createFood(@RequestBody Food food) {
        foodMapper.insert(food);
        return ApiResponse.success("添加成功", food);
    }

    @PutMapping("/food/{id}")
    public ApiResponse<Food> updateFood(@PathVariable Long id, @RequestBody Food food) {
        food.setId(id);
        foodMapper.updateById(food);
        return ApiResponse.success("更新成功", foodMapper.selectById(id));
    }

    @DeleteMapping("/food/{id}")
    public ApiResponse<Void> deleteFood(@PathVariable Long id) {
        foodMapper.deleteById(id);
        return ApiResponse.success("删除成功", null);
    }

    // ==================== 攻略管理 ====================
    @PostMapping("/guides")
    public ApiResponse<Guide> createGuide(@RequestBody Guide guide) {
        guideMapper.insert(guide);
        return ApiResponse.success("添加成功", guide);
    }

    @PutMapping("/guides/{id}")
    public ApiResponse<Guide> updateGuide(@PathVariable Long id, @RequestBody Guide guide) {
        guide.setId(id);
        guideMapper.updateById(guide);
        return ApiResponse.success("更新成功", guideMapper.selectById(id));
    }

    @DeleteMapping("/guides/{id}")
    public ApiResponse<Void> deleteGuide(@PathVariable Long id) {
        guideMapper.deleteById(id);
        return ApiResponse.success("删除成功", null);
    }

    // ==================== 游记管理 ====================
    @PutMapping("/travelogues/{id}")
    public ApiResponse<Travelogue> updateTravelogue(@PathVariable Long id, @RequestBody Travelogue travelogue) {
        travelogue.setId(id);
        travelogueMapper.updateById(travelogue);
        return ApiResponse.success("更新成功", travelogueMapper.selectById(id));
    }

    @DeleteMapping("/travelogues/{id}")
    public ApiResponse<Void> deleteTravelogue(@PathVariable Long id) {
        travelogueMapper.deleteById(id);
        return ApiResponse.success("删除成功", null);
    }

    // ==================== 订单管理 ====================
    /** GET /api/admin/orders - 获取全部订单列表（分页 + 筛驯?*/
    @GetMapping("/orders")
    public ApiResponse<Map<String, Object>> listOrders(
            @RequestParam(defaultValue = "1") int pageNum,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String keyword) {
        var qw = new LambdaQueryWrapper<TravelOrder>();
        if (status != null && !status.isEmpty()) qw.eq(TravelOrder::getStatus, status);
        if (type != null && !type.isEmpty()) qw.eq(TravelOrder::getType, type);
        qw.orderByDesc(TravelOrder::getCreateTime);
        Page<TravelOrder> page = orderMapper.selectPage(new Page<>(pageNum, pageSize), qw);

        // 为每个订单填充关联的名称信息
        for (TravelOrder order : page.getRecords()) {
            if (order.getScenicId() != null) {
                Scenic s = scenicMapper.selectById(order.getScenicId());
                if (s != null) order.setScenicName(s.getName());
            }
            if (order.getFoodId() != null) {
                Food f = foodMapper.selectById(order.getFoodId());
                if (f != null) order.setFoodName(f.getName());
            }
            if (order.getUserId() != null) {
                User u = userMapper.selectById(order.getUserId());
                if (u != null) order.setUsername(u.getUsername());
            }
        }

        // 关键词过滤
        if (keyword != null && !keyword.isEmpty()) {
            String kw = keyword.toLowerCase();
            List<TravelOrder> filtered = page.getRecords().stream()
                .filter(o -> (o.getScenicName() != null && o.getScenicName().toLowerCase().contains(kw))
                    || (o.getFoodName() != null && o.getFoodName().toLowerCase().contains(kw))
                    || (o.getUsername() != null && o.getUsername().toLowerCase().contains(kw)))
                .collect(Collectors.toList());
            page.setRecords(filtered);
            page.setTotal(filtered.size());
        }

        // 统计各状态数量
        Map<String, Long> counts = new LinkedHashMap<>();
        counts.put("pending", orderMapper.selectCount(
            new LambdaQueryWrapper<TravelOrder>().eq(TravelOrder::getStatus, "pending")));
        counts.put("paid", orderMapper.selectCount(
            new LambdaQueryWrapper<TravelOrder>().eq(TravelOrder::getStatus, "paid")));
        counts.put("completed", orderMapper.selectCount(
            new LambdaQueryWrapper<TravelOrder>().eq(TravelOrder::getStatus, "completed")));
        counts.put("cancelled", orderMapper.selectCount(
            new LambdaQueryWrapper<TravelOrder>().eq(TravelOrder::getStatus, "cancelled")));

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("records", page.getRecords());
        result.put("total", page.getTotal());
        result.put("counts", counts);
        return ApiResponse.success(result);
    }

    /** GET /api/admin/orders/{id} - 获取订单详情 */
    @GetMapping("/orders/{id}")
    public ApiResponse<TravelOrder> getOrderDetail(@PathVariable Long id) {
        TravelOrder order = orderMapper.selectById(id);
        if (order == null) return ApiResponse.error(404, "订单不存在");
        // 填充关联信息
        if (order.getScenicId() != null) {
            Scenic s = scenicMapper.selectById(order.getScenicId());
            if (s != null) order.setScenicName(s.getName());
        }
        if (order.getFoodId() != null) {
            Food f = foodMapper.selectById(order.getFoodId());
            if (f != null) order.setFoodName(f.getName());
        }
        if (order.getUserId() != null) {
            User u = userMapper.selectById(order.getUserId());
            if (u != null) order.setUsername(u.getUsername());
        }
        return ApiResponse.success(order);
    }

    /** POST /api/admin/orders - 管理员创建订单 */
    @PostMapping("/orders")
    public ApiResponse<TravelOrder> createOrder(@RequestBody TravelOrder order) {
        TravelOrder created = orderService.createOrder(order);
        return ApiResponse.success("下单成功", created);
    }

    /**
     * PUT /api/admin/orders/{id} - 更新订单状态（管理员专用）
     * 管理员可以将 paid 订单标记为 completed，也可以取消订单
     */
    @PutMapping("/orders/{id}")
    public ApiResponse<TravelOrder> updateOrder(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        if (status == null || status.isEmpty()) {
            return ApiResponse.error(400, "状态不能为空");
        }
        try {
            TravelOrder updated = orderService.updateOrderStatus(id, status, true);
            return ApiResponse.success("订单更新成功", updated);
        } catch (IllegalArgumentException e) {
            return ApiResponse.error(404, e.getMessage());
        } catch (IllegalStateException e) {
            return ApiResponse.error(400, e.getMessage());
        }
    }

    /** DELETE /api/admin/orders/{id} - 删除订单 */
    @DeleteMapping("/orders/{id}")
    public ApiResponse<Void> deleteOrder(@PathVariable Long id) {
        orderMapper.deleteById(id);
        return ApiResponse.success("删除成功", null);
    }
}
