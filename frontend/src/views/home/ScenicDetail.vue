<template>
  <div class="detail-page" v-if="scenic">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card>
          <img :src="scenic.coverImage" @error="e.target.src='/images/placeholder-' + ((scenic.id % 8) + 1) + '.svg'" style="width:100%;max-height:400px;object-fit:cover;border-radius:8px" />
          <h2>{{ scenic.name }}</h2>
          <p style="color:#999">{{ scenic.location }} | 评分: {{ scenic.rating }} | {{ scenic.tags }}</p>
          <el-divider />
          <div style="line-height:1.8;white-space:pre-wrap">{{ scenic.description }}</div>
          <el-divider />
          <p><b>开放时间:</b> {{ scenic.openTime }}</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="order-panel" style="position:sticky;top:20px">
          <template #header><span>门票预订</span></template>
          <p><b>{{ scenic.name }}</b></p>
          <p style="font-size:24px;color:#e6a23c">{{ scenic.price ? '¥' + scenic.price : '免费' }}</p>
          <el-form label-width="80px">
            <el-form-item label="成人票"><el-input-number v-model="adult" :min="0" :max="10" /></el-form-item>
            <el-form-item label="儿童票"><el-input-number v-model="child" :min="0" :max="10" /></el-form-item>
          </el-form>
          <p><b>合计:</b> <span style="color:#f56c6c;font-size:20px">¥{{ totalPrice }}</span></p>
          <el-button type="primary" size="large" style="width:100%" @click="handleOrder" :disabled="adult+child===0">立即购买</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import request from "../../api/request";
import { ElMessage } from "element-plus";
const route = useRoute();
const scenic = ref(null);
const adult = ref(1);
const child = ref(0);
const totalPrice = computed(() => (scenic.value?.price||0)*(adult.value+child.value*0.5));
onMounted(async () => {
  const res = await request.get("/api/scenic/"+route.params.id);
  scenic.value = res.data.data;
});
async function handleOrder() {
  try {
    const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    await request.post("/api/user/orders", { userId: userInfo.userId || 0, username: userInfo.nickname || "", type:"scenic", scenicId: scenic.value.id, scenicName: scenic.value.name, adultTickets: adult.value, childTickets: child.value, totalPrice: totalPrice.value, status:"pending" });
    ElMessage.success("下单成功");
  } catch(e) { ElMessage.error("下单失败"); }
}
</script>
<style scoped>
.detail-page { max-width: 1200px; margin: 0 auto; }
.order-panel { border: 1px solid #e4e7ed; }
</style>