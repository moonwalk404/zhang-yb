<template>
  <div class="scenic-page">
    <el-card><template #header><span>景区列表</span></template>
      <el-row :gutter="12" style="margin-bottom:16px">
        <el-col :span="6"><el-input v-model="keyword" placeholder="搜索景区" clearable @clear="search" @keyup.enter="search" /></el-col>
        <el-col :span="6"><el-select v-model="category" placeholder="分类筛选" clearable @change="search"><el-option v-for="c in categories" :key="c" :label="c" :value="c" /></el-select></el-col>
        <el-col :span="6"><el-button type="primary" @click="search">搜索</el-button></el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col v-for="s in list" :key="s.id" :span="6" style="margin-bottom:16px">
          <el-card shadow="hover" @click="router.push('/home/scenic/'+s.id)" class="s-card">
            <img :src="s.coverImage" @error="e.target.src='/images/placeholder-' + ((s.id % 8) + 1) + '.svg'" class="s-img" />
            <div style="padding:8px 0"><b>{{ s.name }}</b><p style="color:#999;font-size:12px;margin:4px 0">{{ s.location }}</p>
              <span style="color:#e6a23c">{{ s.price ? '¥'+s.price : '免费' }}</span>
              <el-rate :model-value="s.rating" disabled show-score text-color="#ff9900" style="float:right" />
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination v-model:current-page="pageNum" :page-size="pageSize" :total="total" layout="prev, pager, next" @current-change="load" style="justify-content:center" />
    </el-card>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import request from "../../api/request";
const router = useRouter();
const list = ref([]);
const pageNum = ref(1);
const pageSize = ref(8);
const total = ref(0);
const keyword = ref("");
const category = ref("");
const categories = ref(["自然景观","人文景观","海岛度假","主题乐园"]);
async function load() {
  const res = await request.get("/api/scenic/page", { params: { pageNum: pageNum.value, pageSize: pageSize.value, keyword: keyword.value, category: category.value } });
  const d = res.data.data;
  list.value = d.records || [];
  total.value = d.total || 0;
}
function search() { pageNum.value = 1; load(); }
onMounted(() => load());
</script>
<style scoped>
.scenic-page { max-width: 1200px; margin: 0 auto; }
.s-card { cursor: pointer; transition: transform 0.2s; }
.s-card:hover { transform: translateY(-4px); }
.s-img { width: 100%; height: 150px; object-fit: cover; border-radius: 4px; }
</style>