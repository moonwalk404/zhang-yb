/**
 * ScenicService - 景区服务
 * 处理景区的查询、列表分页、详情获取等业务逻辑
 */
package com.travel.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.travel.entity.Scenic;
import com.travel.mapper.ScenicMapper;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ScenicService {
    private final ScenicMapper scenicMapper;

    public ScenicService(ScenicMapper scenicMapper) { this.scenicMapper = scenicMapper; }

    public List<Scenic> listAll() {
        return scenicMapper.selectList(new LambdaQueryWrapper<Scenic>().eq(Scenic::getStatus, 1));
    }

    public Page<Scenic> page(int pageNum, int pageSize, String keyword, String category) {
        var qw = new LambdaQueryWrapper<Scenic>().eq(Scenic::getStatus, 1);
        if (keyword != null && !keyword.isEmpty()) {
            qw.and(w -> w.like(Scenic::getName, keyword).or().like(Scenic::getLocation, keyword));
        }
        if (category != null && !category.isEmpty()) {
            qw.eq(Scenic::getCategory, category);
        }
        qw.orderByDesc(Scenic::getRating);
        return scenicMapper.selectPage(new Page<>(pageNum, pageSize), qw);
    }

    public Scenic getById(Long id) {
        return scenicMapper.selectById(id);
    }

    public List<Scenic> getRecommendations(int limit) {
        var qw = new LambdaQueryWrapper<Scenic>().eq(Scenic::getStatus, 1)
                .orderByDesc(Scenic::getRating).last("LIMIT " + limit);
        return scenicMapper.selectList(qw);
    }
}
