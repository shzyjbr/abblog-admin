<template>
  <!-- {{ route.meta }} -->
  <div class="app flex-between-center p-x-10">
    <div class="flex-center-center"></div>

    <wx-mp-account />

    <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
      <div class="flex-center-center">
        <div class="flex-center-center">
          <span class="m-l-6"> zzk </span>
          <el-icon :size="20" style="width: 20px">
            <ArrowDown />
          </el-icon>
        </div>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <router-link to="/system/personal-center">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://gitee.com/zhengqingya">
            <el-dropdown-item>Gitee</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.app {
  // -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}
</style>
