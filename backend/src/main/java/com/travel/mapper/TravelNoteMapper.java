/**
 * TravelNoteMapper - 游记数据访问层
 */
package com.travel.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.travel.entity.TravelNote;
import org.apache.ibatis.annotations.Mapper;


/**
 * 游记 Mapper，继承 MyBatis-Plus BaseMapper
 */
@Mapper
public interface TravelNoteMapper extends BaseMapper<TravelNote> { }
