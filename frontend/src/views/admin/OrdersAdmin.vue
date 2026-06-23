<template>
  <div class="ao-page">
    <el-card>
      <template #header>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span>订单管理</span>
          <div style="display:flex;gap:12px">
            <el-tag type="warning">待支付: {{ counts.pending || 0 }}</el-tag>
            <el-tag type="success">已支付: {{ counts.paid || 0 }}</el-tag>
            <el-tag>已完成: {{ counts.completed || 0 }}</el-tag>
            <el-tag type="info">已取消: {{ counts.cancelled || 0 }}</el-tag>
          </div>
        </div>
      </template>

      <!-- 筛选栏 -->
      <el-row :gutter="10" style="margin-bottom:14px">
        <el-col :span="5">
          <el-select v-model="statusFilter" placeholder="状态筛选" clearable @change="load">
            <el-option label="待支付" value="pending" />
            <el-option label="已支付" value="paid" />
            <el-option label="已完成" value="completed" />
            <el-option label="已取消" value="cancelled" />
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select v-model="typeFilter" placeholder="类型筛选" clearable @change="load">
            <el-option label="景区" value="scenic" />
            <el-option label="美食" value="food" />
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-input v-model="keyword" placeholder="搜索项目/用户名" clearable @change="load" />
        </el-col>
      </el-row>

      <!-- 订单表格 -->
      <el-table :data="list" stripe>
        <el-table-column prop="id" label="ID" width="70" />
        <el-table-column prop="orderNo" label="订单编号" width="200" />
        <el-table-column label="类型" width="70">
          <template #default="{row}">
            <el-tag size="small" :type="row.type==='food'?'warning':''">{{ row.type==='food'?'美食':'景区' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="项目" min-width="150">
          <template #default="{row}">{{ row.scenicName || row.foodName || '-' }}</template>
        </el-table-column>
        <el-table-column prop="username" label="用户" width="100" />
        <el-table-column prop="quantity" label="数量" width="60" />
        <el-table-column label="金额" width="90">
          <template #default="{row}">¥{{ row.totalPrice }}</template>
        </el-table-column>
        <el-table-column label="状态" width="90">
          <template #default="{row}">
            <el-tag :type="statusType(row.status)" size="small">{{ statusLabel(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="时间" width="170">
          <template #default="{row}">{{ row.createTime?.substring(0,16) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{row}">
            <!-- 待支付订单：可取消 -->
            <el-button v-if="row.status==='pending'" size="small" type="danger" @click="updateStatus(row,'cancelled')">取消</el-button>
            <!-- 已支付订单：可完成 / 可取消 -->
            <el-button v-if="row.status==='paid'" size="small" type="success" @click="updateStatus(row,'completed')">确认完成</el-button>
            <el-button v-if="row.status==='paid'" size="small" type="danger" @click="updateStatus(row,'cancelled')">取消</el-button>
            <!-- 已完成/已取消：仅可删除 -->
            <el-button v-if="row.status==='completed' || row.status==='cancelled'" size="small" type="danger" plain @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="pageNum"
        :page-size="10"
        :total="total"
        layout="prev,pager,next"
        @current-change="load"
        style="justify-content:center;margin-top:16px"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import request from "../../api/request";
import { ElMessage, ElMessageBox } from "element-plus";

const list = ref([]);
const pageNum = ref(1);
const total = ref(0);
const statusFilter = ref("");
const typeFilter = ref("");
const keyword = ref("");
const counts = ref({});

function statusType(s) {
  if (s === "paid") return "success";
  if (s === "pending") return "warning";
  if (s === "cancelled") return "info";
  return "";
}
function statusLabel(s) {
  if (s === "paid") return "已支付";
  if (s === "pending") return "待支付";
  if (s === "cancelled") return "已取消";
  if (s === "completed") return "已完成";
  return s;
}

async function load() {
  const res = await request.get("/api/admin/orders", {
    params: {
      pageNum: pageNum.value,
      pageSize: 10,
      status: statusFilter.value || undefined,
      type: typeFilter.value || undefined,
      keyword: keyword.value || undefined
    }
  });
  const d = res.data.data;
  list.value = d.records || [];
  total.value = d.total || 0;
  counts.value = d.counts || {};
}

async function updateStatus(row, status) {
  const label = status === "completed" ? "确认完成" : "取消";
  try {
    await ElMessageBox.confirm(`确定要将订单 #${row.id} ${label}吗？`, "操作确认", { type: "warning" });
    await request.put("/api/admin/orders/" + row.id, { status });
    ElMessage.success("操作成功");
    load();
  } catch (e) {
    if (e !== "cancel") ElMessage.error("操作失败");
  }
}

async function handleDelete(row) {
  try {
    await ElMessageBox.confirm("确认删除该订单吗？此操作不可恢复。", "删除确认", { type: "warning" });
    await request.delete("/api/admin/orders/" + row.id);
    ElMessage.success("已删除");
    load();
  } catch (e) {
    // 用户取消
  }
}

onMounted(() => load());
</script>

<style scoped>
.ao-page { max-width: 1300px; margin: 0 auto; }
</style>
