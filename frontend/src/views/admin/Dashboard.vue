<template>
  <div class="dash-page">
    <el-row :gutter="16">
      <el-col v-for="s in statsItems" :key="s.label" :span="6" style="margin-bottom:16px">
        <el-card shadow="hover"><div style="text-align:center"><p style="color:#999;font-size:13px;margin:0">{{ s.label }}</p><p style="font-size:32px;font-weight:700;margin:8px 0;color:#409EFF">{{ s.value }}</p></div></el-card>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="12"><el-card><template #header><span>今日概览</span></template>
        <p>今日订单: {{ stats.todayOrders || 0 }}</p>
        <p>今日收入: 133;{{ (stats.todayRevenue || 0).toFixed(2) }}</p>
      </el-card></el-col>
      <el-col :span="12"><el-card><template #header><span>快捷操作</span></template>
        <el-button style="margin:4px" @click="router.push('/admin/users')">用户管理</el-button>
        <el-button style="margin:4px" @click="router.push('/admin/orders')">订单管理</el-button>
        <el-button style="margin:4px" @click="router.push('/admin/scenic')">景区管理</el-button>
        <el-button style="margin:4px" @click="router.push('/home')">用户端</el-button>
      </el-card></el-col>
    </el-row>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import request from "../../api/request";
const router = useRouter();
const stats = ref({});
const statsItems = computed(() => [
  { label: "景区数", value: stats.value.scenicCount || 0 },
  { label: "用户数", value: stats.value.userCount || 0 },
  { label: "攻略数", value: stats.value.guideCount || 0 },
  { label: "订单数", value: stats.value.orderCount || 0 },
]);
onMounted(async () => {
  const res = await request.get("/api/admin/stats");
  stats.value = res.data.data || {};
});
</script>
<style scoped>
.dash-page { max-width: 1200px; margin: 0 auto; }
</style>