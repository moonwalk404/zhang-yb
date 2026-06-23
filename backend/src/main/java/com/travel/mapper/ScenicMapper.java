/**
 * ScenicMapper - 景区数据访问层
 */
package com.travel.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.travel.entity.Scenic;
import org.apache.ibatis.annotations.Mapper;


/**
 * 景区 Mapper，继承 MyBatis-Plus BaseMapper
 */
@Mapper
public interface ScenicMapper extends BaseMapper<Scenic> { }
