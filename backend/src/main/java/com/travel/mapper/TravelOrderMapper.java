/**
 * TravelOrderMapper - 订单数据访问层
 */
package com.travel.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.travel.entity.TravelOrder;
import org.apache.ibatis.annotations.Mapper;


/**
 * 订单 Mapper，继承 MyBatis-Plus BaseMapper
 */
@Mapper
public interface TravelOrderMapper extends BaseMapper<TravelOrder> { }
