<template>主界面</template>

<script setup>
// import sidebar from './components/sidebar.vue';
// import navbar from './components/navbar.vue';
// import appMain from './components/app-main.vue';
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
});

watchEffect(() => {
  if (!user.isLogin) {
    router.push('/login');
  }
});

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
