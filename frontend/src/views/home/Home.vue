<template>
  <div class="home-page">
    <el-carousel height="320px" :interval="5000" arrow="always">
      <el-carousel-item v-for="s in highlights" :key="s.id">
        <div class="carousel-slide" :style="{backgroundImage:'url('+s.coverImage+')'}">
          <div class="carousel-text"><h2>{{ s.name }}</h2><p>{{ s.location }}</p></div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="quick-nav">
      <div v-for="item in navItems" :key="item.path" class="nav-item" @click="router.push(item.path)">
        <el-icon :size="28"><component :is="item.icon" /></el-icon>
        <span>{{ item.label }}</span>
      </div>
    </div>
    <el-card class="section-card"><template #header><span>热门推荐</span></template>
      <el-row :gutter="16">
        <el-col v-for="s in hotScenics" :key="s.id" :span="8" style="margin-bottom:16px">
          <el-card shadow="hover" @click="router.push('/home/scenic/'+s.id)" class="hot-card">
            <img :src="s.coverImage" @error="e.target.src='/images/placeholder-' + ((s.id % 8) + 1) + '.svg'" style="width:100%;height:140px;object-fit:cover;border-radius:4px" />
            <div style="padding:8px 0"><b>{{ s.name }}</b><br/><span style="color:#999;font-size:12px">{{ s.location }}</span></div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import request from "../../api/request";
import { Picture, Reading, MapLocation, Notebook, Guide, DishDot } from "@element-plus/icons-vue";
const router = useRouter();
const navItems = [
  { label: "景区", path: "/home/scenic", icon: Picture },
  { label: "攻略", path: "/home/strategy", icon: Reading },
  { label: "地图", path: "/home/map", icon: MapLocation },
  { label: "游记", path: "/home/note", icon: Notebook },
  { label: "行程", path: "/home/itinerary", icon: Guide },
  { label: "美食", path: "/home/food", icon: DishDot },
];
const highlights = ref([]);
const hotScenics = ref([]);
onMounted(async () => {
  try {
    const r1 = await request.get("/api/scenic/recommend?limit=5");
    highlights.value = r1.data.data || [];
    const r2 = await request.get("/api/scenic/recommend?limit=6");
    hotScenics.value = r2.data.data || [];
  } catch(e) {}
});
</script>
<style scoped>
.home-page { max-width: 1200px; margin: 0 auto; }
.carousel-slide { height: 100%; background-size: cover; background-position: center; display: flex; align-items: flex-end; }
.carousel-text { padding: 40px; color: #fff; text-shadow: 0 2px 8px rgba(0,0,0,0.6); }
.carousel-text h2 { font-size: 28px; margin: 0; }
.quick-nav { display: flex; justify-content: center; gap: 32px; padding: 24px 0; }
.nav-item { display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer; color: #606266; transition: color 0.2s; }
.nav-item:hover { color: #409EFF; }
.section-card { margin: 16px 0; }
.hot-card { cursor: pointer; transition: transform 0.2s; }
.hot-card:hover { transform: translateY(-4px); }
</style>