<template>
  <div class="sdetail-page" v-if="guide">
    <el-card>
      <img :src="guide.coverImage" @error="e.target.src='/images/placeholder-' + ((guide.id % 8) + 1) + '.svg'" style="width:100%;max-height:360px;object-fit:cover;border-radius:8px;margin-bottom:16px" />
      <h1>{{ guide.title }}</h1>
      <p style="color:#999">{{ guide.author }} | {{ guide.createTime?.substring(0,10) }} | ❤️  {{ guide.likes || 0 }} | 收藏 {{ guide.favorites || 0 }} | 浏览 {{ guide.views || 0 }}</p>
      <div style="margin:16px 0">
        <el-button @click="handleLike" :icon="Star">点赞</el-button>
        <el-button @click="handleFav" :icon="Star">收藏</el-button>
      </div>
      <el-divider />
      <div v-html="guide.content" style="line-height:1.8"></div>
    </el-card>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import request from "../../api/request";
import { ElMessage } from "element-plus";
import { Star } from "@element-plus/icons-vue";
const route = useRoute();
const guide = ref(null);
onMounted(async () => {
  const res = await request.get("/api/content/guides/"+route.params.id);
  guide.value = res.data.data;
});
async function handleLike() {
  try { await request.post("/api/content/guides/"+guide.value.id+"/like"); guide.value.likes++; ElMessage.success("已点赞"); } catch(e) {}
}
async function handleFav() {
  try { await request.post("/api/content/guides/"+guide.value.id+"/fav"); guide.value.favorites++; ElMessage.success("已收藏"); } catch(e) {}
}
</script>
<style scoped>
.sdetail-page { max-width: 900px; margin: 0 auto; }
</style>