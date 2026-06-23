/**
 * TravelogueMapper - 游记（UGC）数据访问层
 */
package com.travel.mapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.travel.entity.Travelogue;
import org.apache.ibatis.annotations.Mapper;

/**
 * 游记（UGC）Mapper，继承 MyBatis-Plus BaseMapper
 */
@Mapper
public interface TravelogueMapper extends BaseMapper<Travelogue> { }
