/**
 * FoodMapper - 美食数据访问层
 */
package com.travel.mapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.travel.entity.Food;
import org.apache.ibatis.annotations.Mapper;

/**
 * 美食 Mapper，继承 MyBatis-Plus BaseMapper
 */
@Mapper
public interface FoodMapper extends BaseMapper<Food> { }
