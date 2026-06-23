<template>
  <div class="at-page">
    <el-card><template #header><span>游记管理</span></template>
      <el-table :data="list" stripe>
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="author" label="作者" width="120" />
        <el-table-column prop="views" label="浏览" width="80" />
        <el-table-column label="操作" width="120"><template #default="{row}">
          <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
        </template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import request from "../../api/request";
import { ElMessage, ElMessageBox } from "element-plus";
const list = ref([]);
const pageNum = ref(1);
onMounted(async () => {
  const res = await request.get("/api/content/travelogues", { params: { pageNum: pageNum.value, pageSize: 20 } });
  list.value = (res.data.data?.records) || [];
});
async function handleDelete(row) {
  await ElMessageBox.confirm("确认删除?","提示",{type:"warning"});
  await request.delete("/api/admin/travelogues/"+row.id);
  ElMessage.success("已删除");
  // refresh
  const res = await request.get("/api/content/travelogues", { params: { pageNum: 1, pageSize: 20 } });
  list.value = (res.data.data?.records) || [];
}
</script>
<style scoped>
.at-page { max-width: 1200px; margin: 0 auto; }
</style>