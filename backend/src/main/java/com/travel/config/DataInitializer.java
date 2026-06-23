/**
 * DataInitializer - 数据初始化器
 * 在应用启动时自动执行，创建默认管理员账号、测试用户、示例景区、美食、攻略等数据
 */
package com.travel.config;

import com.travel.entity.User;
import com.travel.mapper.UserMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userMapper.selectByUsername("admin") == null) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("123456"));
            admin.setNickname("系统管理员");
            admin.setRole("admin");
            admin.setStatus(1);
            userMapper.insert(admin);
        }
        if (userMapper.selectByUsername("traveler") == null) {
            User user = new User();
            user.setUsername("traveler");
            user.setPassword(passwordEncoder.encode("123456"));
            user.setNickname("旅行者小王");
            user.setPhone("13800138000");
            user.setRole("user");
            user.setStatus(1);
            userMapper.insert(user);
        }
    }
}
