<template>
  <div class="strategy-page">
    <el-card>
      <template #header>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span>旅行攻略</span>
          <el-button type="primary" size="small" @click="dialogVisible=true">发布攻略</el-button>
        </div>
      </template>
      <el-row :gutter="8" style="margin-bottom:12px">
        <el-col :span="8"><el-input v-model="keyword" placeholder="搜索攻略" clearable @clear="load" @keyup.enter="load" /></el-col>
      </el-row>
      <div v-for="g in list" :key="g.id" class="guide-item" @click="router.push('/home/strategy/'+g.id)">
        <img :src="g.coverImage" @error="e.target.src='/images/placeholder-' + ((g.id % 8) + 1) + '.svg'" class="guide-thumb" />
        <div class="guide-info">
          <h3>{{ g.title }}</h3>
          <p style="color:#999;font-size:13px">{{ g.author }} | {{ g.createTime?.substring(0,10) }} | ❤️  {{ g.likes || 0 }} | 收藏 {{ g.favorites || 0 }}</p>
          <p style="color:#666;font-size:13px;margin-top:8px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ g.tags }}</p>
        </div>
      </div>
      <el-pagination v-model:current-page="pageNum" :page-size="pageSize" :total="total" layout="prev,pager,next" @current-change="load" style="justify-content:center;margin-top:16px" />
    </el-card>
    <el-dialog v-model="dialogVisible" title="发布攻略" width="600px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="标题"><el-input v-model="form.title" /></el-form-item>
        <el-form-item label="封面图"><el-input v-model="form.coverImage" placeholder="图片URL" /></el-form-item>
        <el-form-item label="内容"><el-input v-model="form.content" type="textarea" :rows="6" /></el-form-item>
        <el-form-item label="标签"><el-input v-model="form.tags" placeholder="用逗号分隔" /></el-form-item>
      </el-form>
      <template #footer><el-button @click="dialogVisible=false">取消</el-button><el-button type="primary" @click="handlePublish">发布</el-button></template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import request from "../../api/request";
import { ElMessage } from "element-plus";
const router = useRouter();
const list = ref([]);
const pageNum = ref(1);
const pageSize = ref(10);
const total = ref(0);
const keyword = ref("");
const dialogVisible = ref(false);
const form = ref({ title:"", author:"", coverImage:"", content:"", tags:"" });
async function load() {
  const res = await request.get("/api/content/guides", { params: { pageNum: pageNum.value, pageSize: pageSize.value, keyword: keyword.value } });
  const d = res.data.data;
  list.value = d.records || [];
  total.value = d.total || 0;
}
async function handlePublish() {
  try {
    const img = form.value.coverImage || "https://picsum.photos/seed/" + Math.random().toString(36).substring(2,10) + "/800/600";
    await request.post("/api/content/guides", { ...form.value, coverImage: img });
    ElMessage.success("发布成功");
    dialogVisible.value = false;
    form.value = { title:"", author:"", coverImage:"", content:"", tags:"" };
    load();
  } catch(e) { ElMessage.error("发布失败"); }
}
onMounted(() => load());
</script>
<style scoped>
.strategy-page { max-width: 1200px; margin: 0 auto; }
.guide-item { display: flex; gap: 16px; padding: 16px 0; border-bottom: 1px solid #ebeef5; cursor: pointer; transition: background 0.2s; }
.guide-item:hover { background: #f5f7fa; }
.guide-thumb { width: 200px; height: 130px; object-fit: cover; border-radius: 6px; flex-shrink: 0; }
.guide-info { flex: 1; }
.guide-info h3 { margin: 0 0 8px; }
</style>