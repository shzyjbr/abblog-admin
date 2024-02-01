<template>
  <div class="flex h-full w-full">
    <!-- 侧边栏菜单 -->
    <sidebar id="sidebar" />
    <div class="flex-1 flex-column">
      <div id="top">
        <!-- 顶部导航栏 -->
        <navbar style="height: 50px" />
        <!-- Tabs标签页 -->
        <div :style="{ width: appMainWidth + 'px' }">
          <h5>一个标签页</h5>
        </div>
      </div>

      <!-- 主页面 -->
      <app-main class="flex-1 app-main" :height="appMainHeight + 'px'" :width="appMainWidth + 'px'" />
    </div>
  </div>
</template>

<script setup>
import sidebar from './components/sidebar.vue';
import navbar from './components/navbar.vue';
import appMain from './components/app-main.vue';
// import tabsView from './components/tabs-view.vue';
import useStore from '@/store';
const { user } = useStore();
import { getCurrentInstance, ref, toRefs, onMounted, onUpdated, watch, onActivated, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const router = useRouter();
const proxy = getCurrentInstance();
console.log(router);
let appMainWidth = ref(0);
let appMainHeight = ref(0);

const { isLogin } = storeToRefs(user);

onMounted(() => {
  console.log('onMount');
  if (!user.isLogin) {
    router.push('/login');
  }
  // 窗口宽高变化时触发 -- tips：window.onresize只能在项目内触发1次
  window.onresize = function windowResize() {
    calWidthAndHeight();
  };
});

watchEffect(() => {
  if (!user.isLogin) {
    router.push('/login');
  }
});

function calWidthAndHeight() {
  let sidebar = document.getElementById('sidebar');
  let sidebarW = sidebar ? sidebar.offsetWidth : 0;
  appMainWidth.value = window.innerWidth - sidebarW;

  let top = document.getElementById('top');
  let topH = top ? top.offsetHeight : 0;
  appMainHeight.value = window.innerHeight - topH;
}

// // 注册一个回调函数，在组件因为响应式状态变更而更新其 DOM 树之后调用。
// onUpdated(() => {
//   calWidthAndHeight();
// });

// function calWidthAndHeight() {
//   let sidebarW = document.getElementById('sidebar').offsetWidth;
//   appMainWidth.value = window.innerWidth - sidebarW;

//   let topH = document.getElementById('top').offsetHeight;
//   appMainHeight.value = window.innerHeight - topH - 20; // 20 指 p-10
// }
</script>
<style lang="scss" scoped></style>
