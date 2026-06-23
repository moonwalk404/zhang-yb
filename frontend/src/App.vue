<!--
  根组件 - 智慧旅游门户
  提供 <router-view> 路由出口
-->
<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
