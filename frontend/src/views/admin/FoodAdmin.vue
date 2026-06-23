<template>
  <div class="af-page">
    <el-card><template #header><div style="display:flex;justify-content:space-between"><span>美食管理</span><el-button type="primary" size="small" @click="openDialog()">新增美食</el-button></div></template>
      <el-table :data="list" stripe>
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="province" label="省份" width="100" />
        <el-table-column prop="avgPrice" label="人均" width="80" />
        <el-table-column label="操作" width="180"><template #default="{row}">
          <el-button size="small" @click="openDialog(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
        </template></el-table-column>
      </el-table>
      <el-pagination v-model:current-page="pageNum" :page-size="10" :total="total" layout="prev,pager,next" @current-change="load" style="justify-content:center;margin-top:16px" />
    </el-card>
    <el-dialog v-model="dialogVisible" :title="isEdit?'编辑美食':'新增美食'" width="500px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="名称"><el-input v-model="form.name" /></el-form-item>
        <el-form-item label="省份"><el-input v-model="form.province" /></el-form-item>
        <el-form-item label="人均"><el-input-number v-model="form.avgPrice" :min="0" /></el-form-item>
        <el-form-item label="图片"><el-input v-model="form.image" /></el-form-item>
        <el-form-item label="描述"><el-input v-model="form.description" type="textarea" :rows="3" /></el-form-item>
      </el-form>
      <template #footer><el-button @click="dialogVisible=false">取消</el-button><el-button type="primary" @click="handleSave">保存</el-button></template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import request from "../../api/request";
import { ElMessage, ElMessageBox } from "element-plus";
const list = ref([]);
const pageNum = ref(1);
const total = ref(0);
const dialogVisible = ref(false);
const isEdit = ref(false);
const form = ref({});
async function load() {
  const res = await request.get("/api/content/food", { params: { pageNum: pageNum.value, pageSize: 10 } });
  const d = res.data.data;
  list.value = d.records || [];
  total.value = d.total || 0;
}
function openDialog(row) {
  isEdit.value = !!row;
  form.value = row ? { ...row } : { name:"", province:"", avgPrice:0, image:"", description:"" };
  dialogVisible.value = true;
}
async function handleSave() {
  try {
    if (isEdit.value) { await request.put("/api/admin/food/"+form.value.id, form.value); }
    else { await request.post("/api/admin/food", form.value); }
    ElMessage.success(isEdit.value?"更新成功":"新增成功");
    dialogVisible.value = false;
    load();
  } catch(e) { ElMessage.error("操作失败"); }
}
async function handleDelete(row) {
  await ElMessageBox.confirm("确认删除?","提示",{type:"warning"});
  await request.delete("/api/admin/food/"+row.id);
  ElMessage.success("已删除");
  load();
}
onMounted(() => load());
</script>
<style scoped>
.af-page { max-width: 1200px; margin: 0 auto; }
</style>