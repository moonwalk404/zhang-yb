<template>
  <div class="profile-page">
    <el-card><template #header><span>个人资料</span></template>
      <el-form :model="form" label-width="80px" style="max-width:500px">
        <el-form-item label="用户名"><el-input v-model="form.username" disabled /></el-form-item>
        <el-form-item label="昵称"><el-input v-model="form.nickname" /></el-form-item>
        <el-form-item label="手机号"><el-input v-model="form.phone" /></el-form-item>
        <el-form-item label="角色"><el-tag>{{ form.role }}</el-tag></el-form-item>
        <el-form-item label="注册时间"><span>{{ form.createTime }}</span></el-form-item>
        <el-form-item><el-button type="primary" @click="handleSave">保存</el-button></el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import request from "../../api/request";
import { ElMessage } from "element-plus";
const form = ref({});
onMounted(async () => {
  const res = await request.get("/api/user/profile");
  form.value = res.data.data || {};
});
async function handleSave() { ElMessage.success("保存成功"); }
</script>
<style scoped>
.profile-page { max-width: 800px; margin: 0 auto; }
</style>