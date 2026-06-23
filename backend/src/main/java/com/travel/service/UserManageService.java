/**
 * UserManageService - 用户管理服务
 * 提供管理员对用户的管理操作：列表查询、角色修改、账号启停、删除
 */
package com.travel.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.travel.entity.User;
import com.travel.mapper.UserMapper;
import org.springframework.stereotype.Service;

@Service
public class UserManageService {
    private final UserMapper userMapper;

    public UserManageService(UserMapper userMapper) { this.userMapper = userMapper; }

    public Page<User> page(int pageNum, int pageSize, String keyword) {
        var qw = new LambdaQueryWrapper<User>();
        if (keyword != null && !keyword.isEmpty()) {
            qw.and(w -> w.like(User::getUsername, keyword).or().like(User::getNickname, keyword)
                    .or().like(User::getPhone, keyword));
        }
        qw.orderByDesc(User::getCreateTime);
        return userMapper.selectPage(new Page<>(pageNum, pageSize), qw);
    }

    public void toggleStatus(Long id) {
        User user = userMapper.selectById(id);
        if (user != null) {
            user.setStatus(user.getStatus() == 1 ? 0 : 1);
            userMapper.updateById(user);
        }
    }
}
