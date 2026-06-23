/**
 * UserMapper - 用户数据访问层
 * 继承 MyBatis-Plus BaseMapper，提供用户的增删改查操作
 */
package com.travel.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.travel.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;


/**
 * 用户 Mapper，提供按用户名查询等自定义方法
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {
    @Select("SELECT * FROM `user` WHERE username = #{username} AND deleted = 0")
    User // 根据用户名查询用户
selectByUsername(String username);
}
