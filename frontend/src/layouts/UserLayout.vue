<!--
  用户端布局
  顶部导航 + 侧边栏菜单 + 内容区
  包含首页/景区/攻略/地图/游记/行程/美食
-->
<template>
  <el-container class="user-layout">
    <!-- 顶部导航栏 -->
    <el-header class="user-header">
      <div class="header-left">
        <el-button text @click="collapse=!collapse"><el-icon :size="20"><Fold v-if="!collapse"/><Expand v-else/></el-icon></el-button>
        <span class="logo-text">智慧旅游</span>
      </div>
      <!-- 用户头像下拉菜单 -->
      <div class="header-right">
        <el-dropdown trigger="click">
          <span class="avatar-wrap">
            <el-avatar :size="36" :src="auth.user?.avatar">{{ auth.user?.nickname?.charAt(0) }}</el-avatar>
            <span class="nickname">{{ auth.user?.nickname }}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="$router.push('/home/user/profile')"><el-icon><User /></el-icon>个人资料</el-dropdown-item>
              <el-dropdown-item @click="$router.push('/home/user/orders')"><el-icon><Tickets /></el-icon>我的订单</el-dropdown-item>
              <el-dropdown-item @click="$router.push('/home/user/favorites')"><el-icon><Star /></el-icon>我的收藏</el-dropdown-item>
              <el-dropdown-item @click="$router.push('/home/user/travelogues')"><el-icon><Document /></el-icon>我的游记</el-dropdown-item>
              <el-dropdown-item divided @click="handleLogout"><el-icon><SwitchButton /></el-icon>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>

    <el-container>
      <!-- 侧边栏 7 个核心模块 -->
      <el-aside :width="collapse?'64px':'200px'" class="user-sidebar">
        <el-menu :default-active="activeMenu" router :collapse="collapse" :collapse-transition="false">
          <el-menu-item index="/home"><el-icon><HomeFilled /></el-icon><span>首页</span></el-menu-item>
          <el-menu-item index="/home/scenic"><el-icon><Picture /></el-icon><span>景区</span></el-menu-item>
          <el-menu-item index="/home/strategy"><el-icon><Reading /></el-icon><span>攻略</span></el-menu-item>
          <el-menu-item index="/home/map"><el-icon><MapLocation /></el-icon><span>地图</span></el-menu-item>
          <el-menu-item index="/home/note"><el-icon><Notebook /></el-icon><span>游记</span></el-menu-item>
          <el-menu-item index="/home/itinerary"><el-icon><Guide /></el-icon><span>行程</span></el-menu-item>
          <el-menu-item index="/home/food"><el-icon><DishDot /></el-icon><span>美食</span></el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主内容区——子路由渲染位置 -->
      <el-main class="user-main"><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useAuthStore } from "../stores/auth"
import { Fold, Expand, User, Tickets, Star, Document, SwitchButton, HomeFilled, Picture, Reading, MapLocation, Notebook, Guide, DishDot } from "@element-plus/icons-vue"

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

// 侧边栏折叠状态
const collapse = ref(false)
// 当前激活的菜单项
const activeMenu = computed(() => "/home/" + (route.path.split("/")[2] || ""))

function handleLogout() { auth.logout(); router.push("/auth") }
</script>

<style scoped>
.user-layout { min-height: 100vh; background: #f5f7fa; }
.user-header {
  display: flex; align-items: center; justify-content: space-between;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  padding: 0 20px; height: 56px;
}
.header-left { display: flex; align-items: center; gap: 12px; }
.logo-text { color: #fff; font-size: 18px; font-weight: 700; }
.header-right { display: flex; align-items: center; }
.avatar-wrap { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.nickname { color: #fff; font-size: 14px; }
.user-sidebar { background: #fff; border-right: 1px solid #e4e7ed; }
.user-main { padding: 20px; background: #f0f2f5; min-height: calc(100vh - 56px); }
</style>
