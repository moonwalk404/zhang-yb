<template>
  <div class="au-page">
    <el-card><template #header><span>用户管理</span></template>
      <el-input v-model="keyword" placeholder="搜索用户" clearable style="width:240px;margin-bottom:16px" @keyup.enter="load" @clear="load" />
      <el-table :data="list" stripe>
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="nickname" label="昵称" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="role" label="角色" width="80"><template #default="{row}"><el-tag size="small" :type="row.role==='admin'?'danger':''">{{ row.role }}</el-tag></template></el-table-column>
        <el-table-column label="状态" width="80"><template #default="{row}"><el-tag size="small" :type="row.status===1?'success':'info'">{{ row.status===1?'正常':'禁用' }}</el-tag></template></el-table-column>
        <el-table-column label="操作" width="140"><template #default="{row}">
          <el-button size="small" @click="toggleStatus(row)">{{ row.status===1?'禁用':'启用' }}</el-button>
        </template></el-table-column>
      </el-table>
      <el-pagination v-model:current-page="pageNum" :page-size="10" :total="total" layout="prev,pager,next" @current-change="load" style="justify-content:center;margin-top:16px" />
    </el-card>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import request from "../../api/request";
import { ElMessage } from "element-plus";
const list = ref([]);
const pageNum = ref(1);
const total = ref(0);
const keyword = ref("");
async function load() {
  const res = await request.get("/api/admin/users", { params: { pageNum: pageNum.value, keyword: keyword.value } });
  const d = res.data.data;
  list.value = d.records || [];
  total.value = d.total || 0;
}
async function toggleStatus(row) {
  await request.put("/api/admin/users/"+row.id+"/toggle-status");
  ElMessage.success("状态已更新");
  load();
}
onMounted(() => load());
</script>
<style scoped>
.au-page { max-width: 1200px; margin: 0 auto; }
</style>