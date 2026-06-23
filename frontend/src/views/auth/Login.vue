<!-- 登录/注册页面 -->
<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-header">
        <h1>智慧旅游</h1>
        <p>探索最美中国</p>
      </div>
      <el-tabs v-model="activeTab" class="auth-tabs">
        <el-tab-pane label="登录" name="login">
          <el-form :model="loginForm" @submit.prevent="handleLogin">
            <el-form-item><el-input v-model="loginForm.username" placeholder="用户名" :prefix-icon="User" /></el-form-item>
            <el-form-item><el-input v-model="loginForm.password" type="password" placeholder="密码" :prefix-icon="Lock" show-password @keyup.enter="handleLogin" /></el-form-item>
            <el-form-item><el-button type="primary" class="auth-btn" @click="handleLogin">登 录</el-button></el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form :model="regForm" @submit.prevent="handleRegister">
            <el-form-item><el-input v-model="regForm.username" placeholder="用户名" :prefix-icon="User" /></el-form-item>
            <el-form-item><el-input v-model="regForm.password" type="password" placeholder="密码" :prefix-icon="Lock" show-password /></el-form-item>
            <el-form-item><el-input v-model="regForm.nickname" placeholder="昵称" /></el-form-item>
            <el-form-item><el-input v-model="regForm.phone" placeholder="手机号（选填）" :prefix-icon="Phone" /></el-form-item>
            <el-form-item><el-button type="success" class="auth-btn" @click="handleRegister">注 册</el-button></el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div class="auth-tip">
        <span>演示账号：admin / 123456（管理员）</span><br/>
        <span>traveler / 123456（普通用户）</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { User, Lock, Phone } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

const router = useRouter();
const auth = useAuthStore();
const activeTab = ref("login");
const loginForm = ref({ username: "", password: "" });
const regForm = ref({ username: "", password: "", nickname: "", phone: "" });

async function handleLogin() {
  try {
    const user = await auth.login(loginForm.value.username, loginForm.value.password);
    router.push(user.role === "admin" ? "/admin" : "/home");
  } catch (e) { ElMessage.error(e.message || "登录失败"); }
}

async function handleRegister() {
  try {
    await auth.register(regForm.value);
    ElMessage.success("注册成功，请登录");
    activeTab.value = "login";
    loginForm.value.username = regForm.value.username;
  } catch (e) { ElMessage.error(e.message || "注册失败"); }
}
</script>

<style scoped>
.auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); }
.auth-card { width: 400px; padding: 40px; background: rgba(255,255,255,0.08); backdrop-filter: blur(20px); border-radius: 16px; border: 1px solid rgba(255,255,255,0.12); }
.auth-header { text-align: center; margin-bottom: 24px; }
.auth-header h1 { color: #fff; font-size: 28px; margin: 0; }
.auth-header p { color: rgba(255,255,255,0.6); margin: 8px 0 0; }
.auth-tabs :deep(.el-tabs__item) { color: rgba(255,255,255,0.5); }
.auth-tabs :deep(.el-tabs__item.is-active) { color: #fff; }
.auth-tabs :deep(.el-tabs__active-bar) { background: #409EFF; }
.auth-tabs :deep(.el-tabs__nav-wrap::after) { background: rgba(255,255,255,0.1); }
.auth-btn { width: 100%; }
.auth-tip { text-align: center; color: rgba(255,255,255,0.4); font-size: 12px; margin-top: 16px; line-height: 1.8; }
</style>