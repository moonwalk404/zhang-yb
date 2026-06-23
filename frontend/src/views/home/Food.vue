<template>
  <div class="food-page">
    <el-card><template #header><span>地方美食</span></template>
      <el-row :gutter="8" style="margin-bottom:12px">
        <el-col :span="8"><el-input v-model="keyword" placeholder="搜索美食" clearable @clear="load" @keyup.enter="load" /></el-col>
        <el-col :span="8"><el-select v-model="province" placeholder="省份筛选" clearable @change="load"><el-option v-for="p in provinces" :key="p" :label="p" :value="p" /></el-select></el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col v-for="f in list" :key="f.id" :span="6" style="margin-bottom:16px">
          <el-card shadow="hover" class="food-card" @click="handleOrder(f)">
            <img :src="f.coverImage" @error="e.target.src='/images/placeholder-' + ((f.id % 8) + 1) + '.svg'" style="width:100%;height:140px;object-fit:cover;border-radius:4px" />
            <div style="padding:8px 0"><b>{{ f.name }}</b><p style="color:#e6a23c;margin:4px 0">人均 ¥{{ f.avgPrice }}</p>
              <el-tag size="small" v-if="f.scenicName">{{ f.scenicName }}</el-tag>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination v-model:current-page="pageNum" :page-size="pageSize" :total="total" layout="prev,pager,next" @current-change="load" style="justify-content:center" />
    </el-card>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import request from "../../api/request";
import { ElMessage } from "element-plus";
const list = ref([]);
const pageNum = ref(1);
const pageSize = ref(12);
const total = ref(0);
const keyword = ref("");
const province = ref("");
const provinces = ref(["四川","湖南","广东","北京","上海","浙江","云南","陕西","山东","福建","江苏"]);
async function load() {
  const res = await request.get("/api/content/food", { params: { pageNum: pageNum.value, pageSize: pageSize.value, keyword: keyword.value, province: province.value } });
  const d = res.data.data;
  list.value = d.records || [];
  total.value = d.total || 0;
}
async function handleOrder(f) {
  try {
    const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    await request.post("/api/user/orders", { userId: String(userInfo.userId || ""), username: userInfo.nickname || "匿名", type:"food", foodId: f.id, foodName: f.name, coverImage: f.coverImage, location: f.location, quantity: 1, totalPrice: f.avgPrice, phone: userInfo.phone || "", scenicName: f.scenicName, scenicId: f.scenicId });
    ElMessage.success("下单成功");
  } catch(e) { ElMessage.error("下单失败"); }
}
onMounted(() => load());
</script>
<style scoped>
.food-page { max-width: 1200px; margin: 0 auto; }
.food-card { cursor: pointer; transition: transform 0.2s; }
.food-card:hover { transform: translateY(-4px); }
</style>
