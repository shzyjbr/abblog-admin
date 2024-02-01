<template>
  <div class="flex-column">
    <div style="position: relative; height: 50px">
      <div id="isCollapseIcon" @click="changeCollapse" class="collapseBtn">
        <component :is="collapseIcon"></component>
      </div>
    </div>
    <div>
      <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
        <el-sub-menu index="1">
          <template #title>
            <el-icon><user /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
          <el-menu-item index="1-3">item three</el-menu-item>
          <el-sub-menu index="1-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <template #title>Navigator Two</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <template #title>Navigator Three</template>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <template #title>Navigator Four</template>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Document, Menu as IconMenu, Setting } from '@element-plus/icons-vue';

const isCollapse = ref(true);
let collapseIcon = ref('expand');
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const changeCollapse = () => {
  isCollapse.value = !isCollapse.value;
  if (isCollapse.value) {
    collapseIcon.value = 'expand';
  } else {
    collapseIcon.value = 'fold';
  }
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:is(.el-menu--collapse) {
  width: 50px;
  padding-right: 20px;
  // min-height: 400px;
}

.collapseBtn {
  width: 25px;
  height: 25px;
  border-radius: 3px;
  position: absolute;
  bottom: 2px;
  right: 2px;
}
.collapseBtn:hover {
  background-color: rgb(0, 162, 255);
}
</style>
