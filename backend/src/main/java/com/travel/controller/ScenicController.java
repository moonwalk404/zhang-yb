/**
 * ScenicController - 景区控制器
 * 处理景区列表、详情、热门推荐等接口，路由前缀 /api/scenic
 */
package com.travel.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.travel.dto.ApiResponse;
import com.travel.entity.Scenic;
import com.travel.service.ScenicService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/scenic")
public class ScenicController {
    private final ScenicService scenicService;

    public ScenicController(ScenicService scenicService) { this.scenicService = scenicService; }

    @GetMapping("/list")
    public ApiResponse<List<Scenic>> list() {
        return ApiResponse.success(scenicService.listAll());
    }

    @GetMapping("/page")
    public ApiResponse<Page<Scenic>> page(
            @RequestParam(defaultValue = "1") int pageNum,
            @RequestParam(defaultValue = "8") int pageSize,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String category) {
        return ApiResponse.success(scenicService.page(pageNum, pageSize, keyword, category));
    }

    @GetMapping("/{id}")
    public ApiResponse<Scenic> detail(@PathVariable Long id) {
        return ApiResponse.success(scenicService.getById(id));
    }

    @GetMapping("/recommend")
    public ApiResponse<List<Scenic>> recommend(@RequestParam(defaultValue = "6") int limit) {
        return ApiResponse.success(scenicService.getRecommendations(limit));
    }
}
