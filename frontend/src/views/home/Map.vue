<template>
  <div class="map-page">
    <div class="map-fullscreen" id="fullmap-container">
      <!-- 左侧地图可视化区域 -->
      <div class="map-visual">
        <div class="map-inner">
          <!-- 标题栏 -->
          <div class="map-title-bar">
            <h2>
              <el-icon><Location /></el-icon>
              景区分布地图
            </h2>
            <span class="spot-count">共 {{ scenics.length }} 个景区</span>
          </div>

          <!-- 标记点网格 -->
          <div class="markers-grid">
            <div
              v-for="item in scenics"
              :key="item.id"
              class="map-marker"
              :style="{
                left: ((item.longitude - 100) / 25 * 92) + '%',
                top: ((40 - item.latitude) / 18 * 88) + '%'
              }"
              @click="selectMarker(item)"
            >
              <div :class="['marker-dot', { active: selected?.id === item.id }]"></div>
              <div class="marker-ripple"></div>
              <div class="marker-label">{{ item.name }}</div>
            </div>
          </div>

          <!-- 信息弹窗 -->
          <transition name="fade">
            <div
              v-if="selected"
              class="info-popup"
              :style="{
                left: 'calc(' + Math.min(85, (selected.longitude - 100) / 25 * 92) + '% - 140px)',
                top: 'calc(' + Math.max(5, (40 - selected.latitude) / 18 * 88) + '% - 20px)'
              }"
            >
              <div
                class="popup-cover"
                :style="{ backgroundImage: 'url(' + selected.coverImage + ')' }"
              ></div>
              <div class="popup-body">
                <h4>{{ selected.name }}</h4>
                <p>
                  <el-icon><MapLocation /></el-icon>
                  {{ selected.location }}
                </p>
                <div class="popup-row">
                  <span class="popup-rating">⭐ {{ selected.rating }}</span>
                  <span v-if="selected.price > 0" class="popup-price">¥{{ selected.price }}</span>
                  <span v-else class="popup-price free">免费</span>
                </div>
                <el-button size="small" type="primary" @click="router.push('/home/scenic/' + selected.id)">
                  查看详情 →
                </el-button>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- 右侧景区列表面板 -->
      <div class="map-panel">
        <h3>景区列表</h3>
        <div class="panel-list">
          <div
            v-for="item in scenics"
            :key="item.id"
            :class="['panel-item', { active: selected?.id === item.id }]"
            @click="selectMarker(item)"
          >
            <span
              class="panel-index"
              :style="{ background: item.rating >= 4.7 ? '#f56c6c' : item.rating >= 4.5 ? '#e6a23c' : '#67c23a' }"
            >
              {{ item.rating }}
            </span>
            <div class="panel-info">
              <span class="panel-name">{{ item.name }}</span>
              <span class="panel-city">{{ item.province }} · {{ item.city }}</span>
            </div>
          </div>
        </div>
        <el-tag type="info" size="small" style="margin-top: 12px;">
          接入高德地图 API Key 后可切换为真实交互地图
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Location, MapLocation } from '@element-plus/icons-vue';
import request from "../../api/request";

const router = useRouter();
const scenics = ref([]);
const selected = ref(null);

const selectMarker = (item) => {
  selected.value = selected.value?.id === item.id ? null : item;
};

onMounted(async () => {
  try {
    const res = await request.get("/api/scenic/list");
    if (res.data.code === 200) {
      scenics.value = res.data.data || [];
    }
  } catch (e) {
    console.error("加载景区数据失败", e);
  }
});
</script>

<style scoped>
.map-page {
  width: 100%;
  height: calc(100vh - 64px);
  overflow: hidden;
}
.map-fullscreen {
  height: 100%;
  display: flex;
}
.map-visual {
  flex: 1;
  display: flex;
  position: relative;
}
.map-inner {
  flex: 1;
  position: relative;
  background: linear-gradient(135deg, #e8f4fd, #d4e8f5, #c9e2f0);
  overflow: hidden;
}
.map-title-bar {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 10;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  padding: 10px 18px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
.map-title-bar h2 {
  font-size: 16px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #303133;
}
.spot-count {
  font-size: 12px;
  color: #909399;
}
.markers-grid {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.map-marker {
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 5;
}
.marker-dot {
  width: 14px;
  height: 14px;
  background: #409eff;
  border: 3px solid #fff;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
}
.marker-dot.active {
  background: #f56c6c;
  transform: scale(1.4);
}
.marker-ripple {
  width: 14px;
  height: 14px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  background: rgba(64, 158, 255, 0.3);
  animation: ripple 2s infinite;
}
@keyframes ripple {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(3); opacity: 0; }
}
.marker-label {
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 11px;
  color: #303133;
  background: rgba(255, 255, 255, 0.85);
  padding: 1px 6px;
  border-radius: 4px;
  pointer-events: none;
}
.info-popup {
  position: absolute;
  z-index: 20;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  width: 280px;
}
.popup-cover {
  height: 120px;
  background-size: cover;
  background-position: center;
}
.popup-body {
  padding: 14px;
}
.popup-body h4 {
  font-size: 15px;
  margin: 0 0 4px;
  color: #303133;
}
.popup-body p {
  font-size: 12px;
  color: #909399;
  margin: 0 0 6px;
  display: flex;
  align-items: center;
  gap: 3px;
}
.popup-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.popup-rating {
  color: #f59e0b;
  font-size: 13px;
  font-weight: 600;
}
.popup-price {
  color: #f56c6c;
  font-size: 16px;
  font-weight: 700;
}
.popup-price.free {
  color: #67c23a;
  font-size: 12px;
}
.map-panel {
  width: 280px;
  background: #fff;
  border-left: 1px solid #e4e7ed;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.map-panel h3 {
  font-size: 16px;
  margin: 0 0 12px;
  color: #303133;
}
.panel-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.panel-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}
.panel-item:hover,
.panel-item.active {
  background: #ecf5ff;
}
.panel-index {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
}
.panel-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.panel-name {
  font-size: 13px;
  font-weight: 500;
  color: #303133;
}
.panel-city {
  font-size: 11px;
  color: #909399;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
