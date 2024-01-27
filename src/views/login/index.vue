<template>
  <h1>hello</h1>
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>
  <el-icon :size="100" color="red">
    <Edit />
  </el-icon>

  <h4>{{ userList }}</h4>

  <button @click="login">Add 1</button>
</template>

<script setup lang="ts">
// 从状态层导出指定模块
import useStore from '@/store';
import request from '@/utils/request';
const { user } = useStore();
// 获取用户列表
let userList = user.getList();

console.log(userList);

const login = () => {
  console.log('login...');
  request
    .get('/event/user/list')
    .then(function (response) {
      console.log('login:::', response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
</script>
<style lang="scss" module></style>
