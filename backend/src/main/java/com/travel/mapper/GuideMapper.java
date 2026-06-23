/**
 * GuideMapper - 攻略数据访问层
 */
package com.travel.mapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.travel.entity.Guide;
import org.apache.ibatis.annotations.Mapper;

/**
 * 攻略 Mapper，继承 MyBatis-Plus BaseMapper
 */
@Mapper
public interface GuideMapper extends BaseMapper<Guide> { }
