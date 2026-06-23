<template>
  <div class="ag-page">
    <el-card><template #header><div style="display:flex;justify-content:space-between"><span>攻略管理</span><el-button type="primary" size="small" @click="openDialog()">新增攻略</el-button></div></template>
      <el-table :data="list" stripe>
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="author" label="作者" width="120" />
        <el-table-column prop="likes" label="点赞" width="80" />
        <el-table-column label="操作" width="180"><template #default="{row}">
          <el-button size="small" @click="openDialog(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
        </template></el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-model="dialogVisible" :title="isEdit?'编辑攻略':'新增攻略'" width="600px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="标题"><el-input v-model="form.title" /></el-form-item>
        <el-form-item label="作者"><el-input v-model="form.author" /></el-form-item>
        <el-form-item label="封面"><el-input v-model="form.coverImage" /></el-form-item>
        <el-form-item label="内容"><el-input v-model="form.content" type="textarea" :rows="6" /></el-form-item>
        <el-form-item label="标签"><el-input v-model="form.tags" /></el-form-item>
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
const dialogVisible = ref(false);
const isEdit = ref(false);
const form = ref({});
async function load() {
  const res = await request.get("/api/content/guides", { params: { pageNum: pageNum.value, pageSize: 20 } });
  list.value = (res.data.data?.records) || [];
}
function openDialog(row) {
  isEdit.value = !!row;
  form.value = row ? { ...row } : { title:"", author:"", coverImage:"", content:"", tags:"" };
  dialogVisible.value = true;
}
async function handleSave() {
  try {
    if (isEdit.value) { await request.put("/api/admin/guides/"+form.value.id, form.value); }
    else { await request.post("/api/admin/guides", form.value); }
    ElMessage.success(isEdit.value?"更新成功":"新增成功");
    dialogVisible.value = false;
    load();
  } catch(e) { ElMessage.error("操作失败"); }
}
async function handleDelete(row) {
  await ElMessageBox.confirm("确认删除?","提示",{type:"warning"});
  await request.delete("/api/admin/guides/"+row.id);
  ElMessage.success("已删除");
  load();
}
onMounted(() => load());
</script>
<style scoped>
.ag-page { max-width: 1200px; margin: 0 auto; }
</style>