<template>
  <div class="note-page">
    <el-card><template #header><span>旅行游记</span></template>
      <div class="masonry">
        <div v-for="t in list" :key="t.id" class="masonry-item">
          <el-card shadow="hover"><img :src="t.images ? t.images.split(',')[0] : '/images/placeholder.svg'" @error="e.target.src='/images/placeholder-' + ((t.id % 8) + 1) + '.svg'" style="width:100%;height:180px;object-fit:cover;border-radius:4px" />
            <h3 style="margin:8px 0">{{ t.title }}</h3>
            <p style="color:#666;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ t.content?.replace(/<[^>]+>/g,'') }}</p>
            <div style="display:flex;justify-content:space-between;color:#999;font-size:12px;margin-top:8px">
              <span>{{ t.username }}</span><span>👍 {{ t.likes || 0 }} | 浏览 {{ t.views || 0 }}</span>
            </div>
          </el-card>
        </div>
      </div>
      <el-pagination v-model:current-page="pageNum" :page-size="pageSize" :total="total" layout="prev,pager,next" @current-change="load" style="justify-content:center;margin-top:16px" />
    </el-card>
    <el-button type="primary" class="publish-fab" @click="dialogVisible=true" circle><el-icon :size="24"><Plus /></el-icon></el-button>
    <el-dialog v-model="dialogVisible" title="发布游记" width="600px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="标题"><el-input v-model="form.title" /></el-form-item>
        <el-form-item label="封面图"><el-input v-model="form.coverImage" placeholder="图片URL" /></el-form-item>
        <el-form-item label="内容"><el-input v-model="form.content" type="textarea" :rows="6" /></el-form-item>
      </el-form>
      <template #footer><el-button @click="dialogVisible=false">取消</el-button><el-button type="primary" @click="handlePublish">发布</el-button></template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import request from "../../api/request";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
const list = ref([]);
const pageNum = ref(1);
const pageSize = ref(12);
const total = ref(0);
const dialogVisible = ref(false);
const form = ref({ title:"", coverImage:"", content:"" });
async function load() {
  const res = await request.get("/api/content/travelogues", { params: { pageNum: pageNum.value, pageSize: pageSize.value } });
  const d = res.data.data;
  list.value = d.records || [];
  total.value = d.total || 0;
}
async function handlePublish() {
  try {
    const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    const img = form.value.coverImage || '/images/placeholder.svg';
    await request.post("/api/content/travelogues", { title: form.value.title, images: img, content: form.value.content, userId: userInfo.userId, username: userInfo.nickname || "匿名" });
    ElMessage.success("发布成功");
    dialogVisible.value = false;
    form.value = { title:"", coverImage:"", content:"" };
    load();
  } catch(e) { ElMessage.error("发布失败"); }
}
onMounted(() => load());
</script>
<style scoped>
.note-page { max-width: 1200px; margin: 0 auto; position: relative; }
.masonry { column-count: 3; column-gap: 16px; }
.masonry-item { break-inside: avoid; margin-bottom: 16px; }
.publish-fab { position: fixed; bottom: 40px; right: 40px; width: 56px; height: 56px; z-index: 100; }
</style>
