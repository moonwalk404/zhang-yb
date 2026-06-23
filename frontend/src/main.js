/**
 * 应用入口 - 主文件
 * 初始化 Vue 实例、Pinia 状态管理、Element Plus UI 库、路由
 */
import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles/global.css";

const app = createApp(App);

// 注册核心插件
app.use(createPinia());   // 状态管理
app.use(router);          // 路由
app.use(ElementPlus, { locale: null });  // UI 组件库

// 全局注册 Element Plus 图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
