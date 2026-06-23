# Smart Travel Portal 智慧旅游门户

基于 **Spring Boot 3.2 + Vue 3 + Element Plus** 的全栈旅游服务平台。

## 功能模块

### 用户端 (/home)
- **首页** — 景区轮播、热门推荐、快捷入口
- **景区** — 多条件筛选、详情页、在线购票
- **攻略** — 文章列表、阅读模式、收藏/点赞
- **地图** — 高德地图、景区标记、路线查看
- **游记** — 瀑布流布局、图文发布
- **行程** — 拖拽规划、路线可视化
- **美食** — 美食推荐、在线下单

### 用户中心 (/home/user)
- 个人资料、我的订单、我的收藏、我的游记

### 管理端 (/admin)
- 仪表盘统计、用户管理、景区/美食/攻略/游记 CRUD
- **订单管理** — 状态流转：用户支付 → 管理员确认完成

## 技术栈

| 层级 | 技术 |
|------|------|
| 后端框架 | Spring Boot 3.2.0 |
| ORM | MyBatis-Plus 3.5.5 |
| 安全 | Spring Security + JWT |
| 数据库 | H2 (内嵌) / MySQL |
| 前端框架 | Vue 3 + Vite |
| UI 组件 | Element Plus |
| 地图 | 高德地图 AMap |

## 快速启动

### 环境要求
- JDK 17+
- Node.js 18+
- Maven 3.8+

### 启动步骤

1. 启动后端
`ash
cd backend
mvnw spring-boot:run
`

2. 启动前端
`ash
cd frontend
npm install
npm run dev
`

3. 或者一键启动
`ash
start-app.bat
`

4. 访问
- 用户端: http://localhost:5173
- 后端API: http://localhost:8088

### 默认账号
| 角色 | 用户名 | 密码 |
|------|--------|------|
| 管理员 | admin | 123456 |
| 普通用户 | traveler | 123456 |

## 项目结构

\\\
smart-travel-portal/
├── backend/                 # Spring Boot 后端
│   └── src/main/java/com/travel/
│       ├── config/          # 安全/跨域配置
│       ├── controller/      # REST 控制器
│       ├── entity/          # 数据实体
│       ├── mapper/          # MyBatis Mapper
│       ├── service/         # 业务逻辑
│       └── dto/             # 数据传输对象
├── frontend/                # Vue 3 前端
│   └── src/
│       ├── api/             # Axios 请求封装
│       ├── layouts/         # 布局组件
│       ├── router/          # 路由配置
│       ├── views/           # 页面组件
│       │   ├── home/        # 用户端 7 大模块
│       │   ├── user/        # 用户中心
│       │   ├── admin/       # 管理端
│       │   └── auth/        # 登录
│       └── stores/          # 状态管理
└── start-app.bat            # 一键启动脚本
\\\

## 订单状态流转

\\\
pending ──用户支付──→ paid ──管理员确认──→ completed
   │                    │
   └──用户取消──→ cancelled ←──管理员取消──┘
\\\

- 用户只能 **支付** 或 **取消** 订单
- **完成订单** 必须由管理员在后台确认
