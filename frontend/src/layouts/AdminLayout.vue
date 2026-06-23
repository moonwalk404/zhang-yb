<!--
  管理端布局
  顶部导航 + 侧边栏 + 内容区
  仅 admin 角色可访问
-->
<template>
  <el-container class="admin-layout">
    <!-- 顶部导航 -->
    <el-header class="admin-header">
      <div class="admin-header-left">
        <span class="admin-logo">管理后台</span>
      </div>
      <div class="admin-header-right">
        <el-tag type="warning" size="small">{{ auth.user?.nickname }}</el-tag>
        <el-button text style="color:#fff;margin-left:12px" @click="handleLogout">退出</el-button>
        <el-button text style="color:#fff" @click="$router.push('/home')">用户端</el-button>
      </div>
    </el-header>

    <el-container>
      <!-- 管理端侧边栏菜单 -->
      <el-aside width="200px" class="admin-sidebar">
        <el-menu :default-active="activeMenu" router>
          <el-menu-item index="/admin"><el-icon><Odometer /></el-icon><span>仪表盘</span></el-menu-item>
          <el-menu-item index="/admin/users"><el-icon><User /></el-icon><span>用户管理</span></el-menu-item>
          <el-menu-item index="/admin/scenic"><el-icon><Picture /></el-icon><span>景区管理</span></el-menu-item>
          <el-menu-item index="/admin/food"><el-icon><DishDot /></el-icon><span>美食管理</span></el-menu-item>
          <el-menu-item index="/admin/guides"><el-icon><Reading /></el-icon><span>攻略管理</span></el-menu-item>
          <el-menu-item index="/admin/travelogues"><el-icon><Notebook /></el-icon><span>游记管理</span></el-menu-item>
          <el-menu-item index="/admin/orders"><el-icon><Tickets /></el-icon><span>订单管理</span></el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 内容区 -->
      <el-main class="admin-main"><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useAuthStore } from "../stores/auth"
import { Odometer, User, Picture, DishDot, Reading, Notebook, Tickets } from "@element-plus/icons-vue"

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

// 当前激活的菜单项
const activeMenu = computed(() => route.path)

function handleLogout() { auth.logout(); router.push("/auth") }
</script>

<style scoped>
.admin-layout { min-height: 100vh; }
.admin-header {
  display: flex; align-items: center; justify-content: space-between;
  background: #1d1e2c; padding: 0 20px; height: 56px;
}
.admin-logo { color: #fff; font-size: 18px; font-weight: 700; }
.admin-header-right { display: flex; align-items: center; }
.admin-sidebar { background: #fff; border-right: 1px solid #e4e7ed; }
.admin-main { padding: 20px; background: #f0f2f5; }
</style>
