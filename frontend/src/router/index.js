import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", redirect: "/auth" },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../views/auth/Login.vue"),
  },
  {
    path: "/home",
    component: () => import("../layouts/UserLayout.vue"),
    redirect: "/home/index",
    children: [
      { path: "index", name: "HomeIndex", component: () => import("../views/home/Home.vue"), meta: { title: "首页" } },
      { path: "scenic", name: "Scenic", component: () => import("../views/home/Scenic.vue"), meta: { title: "景区" } },
      { path: "scenic/:id", name: "ScenicDetail", component: () => import("../views/home/ScenicDetail.vue"), meta: { title: "景区详情" } },
      { path: "strategy", name: "Strategy", component: () => import("../views/home/Strategy.vue"), meta: { title: "攻略" } },
      { path: "strategy/:id", name: "StrategyDetail", component: () => import("../views/home/StrategyDetail.vue"), meta: { title: "攻略详情" } },
      { path: "map", name: "Map", component: () => import("../views/home/Map.vue"), meta: { title: "地图" } },
      { path: "note", name: "Note", component: () => import("../views/home/Note.vue"), meta: { title: "游记" } },
      { path: "itinerary", name: "Itinerary", component: () => import("../views/home/Itinerary.vue"), meta: { title: "行程" } },
      { path: "food", name: "Food", component: () => import("../views/home/Food.vue"), meta: { title: "美食" } },
      { path: "user/profile", name: "Profile", component: () => import("../views/user/Profile.vue"), meta: { title: "个人资料" } },
      { path: "user/orders", name: "MyOrders", component: () => import("../views/user/Orders.vue"), meta: { title: "我的订单" } },
      { path: "user/favorites", name: "Favorites", component: () => import("../views/user/Favorites.vue"), meta: { title: "我的收藏" } },
      { path: "user/travelogues", name: "MyTravelogues", component: () => import("../views/user/Travelogues.vue"), meta: { title: "我的游记" } },
    ],
  },
  {
    path: "/admin",
    component: () => import("../layouts/AdminLayout.vue"),
    redirect: "/admin/dashboard",
    meta: { role: "admin" },
    children: [
      { path: "dashboard", name: "Dashboard", component: () => import("../views/admin/Dashboard.vue"), meta: { title: "仪表盘" } },
      { path: "users", name: "AdminUsers", component: () => import("../views/admin/Users.vue"), meta: { title: "用户管理" } },
      { path: "scenic", name: "AdminScenic", component: () => import("../views/admin/ScenicAdmin.vue"), meta: { title: "景区管理" } },
      { path: "food", name: "AdminFood", component: () => import("../views/admin/FoodAdmin.vue"), meta: { title: "美食管理" } },
      { path: "guides", name: "AdminGuides", component: () => import("../views/admin/GuidesAdmin.vue"), meta: { title: "攻略管理" } },
      { path: "travelogues", name: "AdminTravelogues", component: () => import("../views/admin/TraveloguesAdmin.vue"), meta: { title: "游记管理" } },
      { path: "orders", name: "AdminOrders", component: () => import("../views/admin/OrdersAdmin.vue"), meta: { title: "订单管理" } },
    ],
  },
  { path: "/:pathMatch(.*)*", redirect: "/auth" },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (to.path === "/auth" && token) {
    return role === "admin" ? next("/admin") : next("/home");
  }
  if (to.path.startsWith("/home") && !token) return next("/auth");
  if (to.path.startsWith("/admin")) {
    if (!token) return next("/auth");
    if (role !== "admin") return next("/home");
  }
  next();
});

export default router;