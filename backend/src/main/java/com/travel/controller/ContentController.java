/**
 * ContentController - 内容控制器
 * 处理攻略、游记、美食的查询、发布、点赞、收藏等接口
 */
package com.travel.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.travel.dto.ApiResponse;
import com.travel.entity.*;
import com.travel.service.ContentService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/content")
public class ContentController {
    private final ContentService contentService;

    public ContentController(ContentService cs) { this.contentService = cs; }

    // ==================== 攻略 ====================
    /** GET /api/content/guides - 攻略列表（分页 + 关键词/标签筛选） */
    @GetMapping("/guides")
    public ApiResponse<Page<Guide>> listGuides(
            @RequestParam(defaultValue = "1") int pageNum, @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(required = false) String keyword, @RequestParam(required = false) String tag) {
        return ApiResponse.success(contentService.pageGuides(pageNum, pageSize, keyword, tag));
    }

    /** GET /api/content/guides/{id} - 攻略详情（浏览量+1） */
    @GetMapping("/guides/{id}")
    public ApiResponse<Guide> guideDetail(@PathVariable Long id) {
        Guide g = contentService.getGuideById(id);
        if (g != null) { g.setViews((g.getViews() != null ? g.getViews() : 0) + 1); }
        return ApiResponse.success(g);
    }

    /** POST /api/content/guides/{id}/like - 点赞攻略 */
    @PostMapping("/guides/{id}/like")
    public ApiResponse<Void> likeGuide(@PathVariable Long id) {
        contentService.likeGuide(id); return ApiResponse.success("点赞成功", null);
    }

    /** POST /api/content/guides/{id}/fav - 收藏攻略 */
    @PostMapping("/guides/{id}/fav")
    public ApiResponse<Void> favGuide(@PathVariable Long id) {
        contentService.favGuide(id); return ApiResponse.success("收藏成功", null);
    }

    /** POST /api/content/guides - 发布攻略 */
    @PostMapping("/guides")
    public ApiResponse<Guide> createGuide(@RequestBody Guide guide) {
        contentService.saveGuide(guide);
        return ApiResponse.success("发布成功", guide);
    }

    // ==================== 游记 ====================
    /** GET /api/content/travelogues - 游记列表（分页 + 关键词筛选） */
    @GetMapping("/travelogues")
    public ApiResponse<Page<Travelogue>> listTravelogues(
            @RequestParam(defaultValue = "1") int pageNum, @RequestParam(defaultValue = "12") int pageSize,
            @RequestParam(required = false) String keyword) {
        return ApiResponse.success(contentService.pageTravelogues(pageNum, pageSize, keyword));
    }

    /** GET /api/content/travelogues/{id} - 游记详情（浏览量+1） */
    @GetMapping("/travelogues/{id}")
    public ApiResponse<Travelogue> travelogueDetail(@PathVariable Long id) {
        Travelogue t = contentService.getTravelogueById(id);
        if (t != null) { t.setViews((t.getViews() != null ? t.getViews() : 0) + 1); }
        return ApiResponse.success(t);
    }

    /** POST /api/content/travelogues - 发布游记 */
    @PostMapping("/travelogues")
    public ApiResponse<Void> createTravelogue(@RequestBody Travelogue travelogue) {
        contentService.saveTravelogue(travelogue);
        return ApiResponse.success("发布成功", null);
    }

    // ==================== 美食 ====================
    /** GET /api/content/food - 美食列表（分页 + 关键词/省份筛选） */
    @GetMapping("/food")
    public ApiResponse<Page<Food>> listFood(
            @RequestParam(defaultValue = "1") int pageNum, @RequestParam(defaultValue = "12") int pageSize,
            @RequestParam(required = false) String keyword, @RequestParam(required = false) String province) {
        return ApiResponse.success(contentService.pageFood(pageNum, pageSize, keyword, province));
    }

    /** GET /api/content/food/{id} - 美食详情 */
    @GetMapping("/food/{id}")
    public ApiResponse<Food> foodDetail(@PathVariable Long id) {
        return ApiResponse.success(contentService.getFoodById(id));
    }
}
