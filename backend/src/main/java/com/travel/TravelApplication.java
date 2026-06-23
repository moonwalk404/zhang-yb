/**
 * TravelApplication - Spring Boot 启动类
 * 智慧旅游推荐与管理系统的主入口
 */
package com.travel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


/**
 * 应用主入口，启动 Spring Boot 应用
 */
@SpringBootApplication
public class TravelApplication {
    public static void main(String[] args) {
        SpringApplication.run(TravelApplication.class, args);
    }
}
