<template>
  <div class="orders-page">
    <el-card>
      <template #header>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span>我的订单</span>
          <span style="font-size:12px;color:#999">订单完成后需管理员确认</span>
        </div>
      </template>

      <el-tabs v-model="statusFilter" @tab-change="load">
        <el-tab-pane label="全部" name="" />
        <el-tab-pane label="待支付" name="pending" />
        <el-tab-pane label="已支付" name="paid" />
        <el-tab-pane label="已完成" name="completed" />
        <el-tab-pane label="已取消" name="cancelled" />
      </el-tabs>

      <el-table :data="list" stripe>
        <el-table-column prop="id" label="订单号" width="80" />
        <el-table-column prop="orderNo" label="编号" width="200" />
        <el-table-column label="类型" width="70">
          <template #default="{row}">
            <el-tag size="small" :type="row.type==='food'?'warning':''">{{ row.type==='food'?'美食':'景区' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="项目" min-width="150">
          <template #default="{row}">{{ row.scenicName || row.foodName || '-' }}</template>
        </el-table-column>
        <el-table-column prop="quantity" label="数量" width="60" />
        <el-table-column label="金额" width="90">
          <template #default="{row}">¥{{ row.totalPrice }}</template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="{row}">
            <el-tag :type="statusType(row.status)" size="small">{{ statusLabel(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="时间" width="170">
          <template #default="{row}">{{ row.createTime?.substring(0,16) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{row}">
            <!-- 待支付：去支付 + 取消 -->
            <el-button v-if="row.status==='pending'" type="primary" size="small" @click="payOrder(row)">去支付</el-button>
            <el-button v-if="row.status==='pending'" type="danger" size="small" plain @click="cancelOrder(row)">取消</el-button>
            <!-- 已支付：等待管理员确认完成，可以取消 -->
            <el-tag v-if="row.status==='paid'" type="success" size="small" style="margin-right:8px">等待确认</el-tag>
            <el-button v-if="row.status==='paid'" type="danger" size="small" plain @click="cancelOrder(row)">取消</el-button>
            <!-- 已完成：显示完成 -->
            <el-tag v-if="row.status==='completed'" size="small">已确认</el-tag>
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
  const res = await request.get("/api/user/orders", {
    params: { status: statusFilter.value || undefined }
  });
  const d = res.data.data;
  list.value = d.records || [];
  total.value = d.total || 0;
}

async function payOrder(row) {
  try {
    await ElMessageBox.confirm("确认支付该订单？", "支付确认", { type: "info" });
    await request.put("/api/user/orders/" + row.id, { status: "paid" });
    ElMessage.success("支付成功，等待管理员确认");
    load();
  } catch (e) {
    if (e !== "cancel") ElMessage.error("支付失败");
  }
}

async function cancelOrder(row) {
  try {
    await ElMessageBox.confirm("确认取消该订单？", "取消确认", { type: "warning" });
    await request.put("/api/user/orders/" + row.id, { status: "cancelled" });
    ElMessage.success("已取消");
    load();
  } catch (e) {
    // 用户取消操作
  }
}

onMounted(() => load());
</script>

<style scoped>
.orders-page { max-width: 1200px; margin: 0 auto; }
</style>
