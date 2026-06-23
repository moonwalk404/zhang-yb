<template>
  <div class="itinerary-page">
    <el-row :gutter="16">
      <el-col :span="10"><el-card><template #header><span>行程规划</span></template>
        <el-timeline>
          <el-timeline-item v-for="(day,di) in days" :key="di" :timestamp="'Day '+(di+1)" placement="top">
            <el-select v-model="days[di]" placeholder="选择景区" filterable style="width:100%">
              <el-option v-for="s in scenics" :key="s.id" :label="s.name" :value="s.id" />
            </el-select>
          </el-timeline-item>
        </el-timeline>
        <el-button style="margin-top:12px" @click="addDay">+ 添加天数</el-button>
      </el-card></el-col>
      <el-col :span="14"><el-card><template #header><span>路线预览</span></template>
        <div style="padding:20px;text-align:center">
          <p v-if="selectedScenics.length===0" style="color:#999">选择景区查看路线</p>
          <div v-else>
            <p v-for="(s,i) in selectedScenics" :key="i" style="padding:8px;background:#f0f2f5;margin:4px 0;border-radius:4px">
              {{ i+1 }}. {{ s.name }} - {{ s.location }}
            </p>
          </div>
        </div>
      </el-card></el-col>
    </el-row>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import request from "../../api/request";
const scenics = ref([]);
const days = ref([null]);
const selectedScenics = computed(() => days.value.filter(d=>d).map(id=>scenics.value.find(s=>s.id===id)).filter(Boolean));
function addDay() { days.value.push(null); }
onMounted(async () => {
  const res = await request.get("/api/scenic/list");
  scenics.value = res.data.data || [];
});
</script>
<style scoped>
.itinerary-page { max-width: 1200px; margin: 0 auto; }
</style>