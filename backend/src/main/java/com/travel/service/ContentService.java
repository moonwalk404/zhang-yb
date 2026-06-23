/**
 * ContentService - 内容服务
 * 处理攻略、游记、美食等内容的业务逻辑，包含收藏、点赞、发布等操作
 */
package com.travel.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.travel.entity.*;
import com.travel.mapper.*;
import org.springframework.stereotype.Service;

@Service
public class ContentService {
    private final GuideMapper guideMapper;
    private final TravelogueMapper travelogueMapper;
    private final FoodMapper foodMapper;

    public ContentService(GuideMapper gm, TravelogueMapper tm, FoodMapper fm) {
        this.guideMapper = gm; this.travelogueMapper = tm; this.foodMapper = fm;
    }

    // ==================== 攻略 ====================
    public Page<Guide> pageGuides(int pageNum, int pageSize, String keyword, String tag) {
        var qw = new LambdaQueryWrapper<Guide>().eq(Guide::getStatus, 1);
        if (keyword != null && !keyword.isEmpty()) qw.like(Guide::getTitle, keyword);
        if (tag != null && !tag.isEmpty()) qw.like(Guide::getTags, tag);
        qw.orderByDesc(Guide::getCreateTime);
        return guideMapper.selectPage(new Page<>(pageNum, pageSize), qw);
    }

    public Guide getGuideById(Long id) { return guideMapper.selectById(id); }

    /** 点赞攻略 */
    public void likeGuide(Long id) {
        Guide g = guideMapper.selectById(id);
        if (g != null) { g.setLikes((g.getLikes() != null ? g.getLikes() : 0) + 1); guideMapper.updateById(g); }
    }

    /** 收藏攻略 */
    public void favGuide(Long id) {
        Guide g = guideMapper.selectById(id);
        if (g != null) { g.setFavorites((g.getFavorites() != null ? g.getFavorites() : 0) + 1); guideMapper.updateById(g); }
    }

    /** 发布攻略 */
    public void saveGuide(Guide guide) {
        guide.setStatus(1);
        guide.setLikes(0);
        guide.setFavorites(0);
        guide.setViews(0);
        guideMapper.insert(guide);
    }

    // ==================== 游记 ====================
    public Page<Travelogue> pageTravelogues(int pageNum, int pageSize, String keyword) {
        var qw = new LambdaQueryWrapper<Travelogue>().eq(Travelogue::getStatus, 1);
        if (keyword != null && !keyword.isEmpty()) qw.like(Travelogue::getTitle, keyword);
        qw.orderByDesc(Travelogue::getCreateTime);
        return travelogueMapper.selectPage(new Page<>(pageNum, pageSize), qw);
    }

    public Travelogue getTravelogueById(Long id) { return travelogueMapper.selectById(id); }

    /** 发布游记 */
    public void saveTravelogue(Travelogue t) {
        t.setStatus(t.getStatus() != null ? t.getStatus() : 1);
        t.setLikes(t.getLikes() != null ? t.getLikes() : 0);
        t.setViews(t.getViews() != null ? t.getViews() : 0);
        travelogueMapper.insert(t);
    }

    // ==================== 美食 ====================
    public Page<Food> pageFood(int pageNum, int pageSize, String keyword, String province) {
        var qw = new LambdaQueryWrapper<Food>().eq(Food::getStatus, 1);
        if (keyword != null && !keyword.isEmpty()) qw.like(Food::getName, keyword);
        if (province != null && !province.isEmpty()) qw.eq(Food::getProvince, province);
        qw.orderByDesc(Food::getCreateTime);
        return foodMapper.selectPage(new Page<>(pageNum, pageSize), qw);
    }

    public Food getFoodById(Long id) { return foodMapper.selectById(id); }
}
