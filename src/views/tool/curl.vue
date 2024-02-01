<template>
  <div class="container">
    <div class="left-pane">
      <el-row class="m-5">
        <el-col :span="4">
          <div class="flex-center"><h4>http method:</h4></div>
        </el-col>
        <el-col :span="12">
          <el-select v-model="httpMethod" class="m-2" placeholder="Select Http Method" size="large" style="width: 240px">
            <el-option v-for="item in methodOpts" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>
      </el-row>
      <el-row class="m-5">
        <el-col :span="4">
          <div class="flex-center"><h4>Content-Type:</h4></div>
        </el-col>
        <el-col :span="12">
          <el-select v-model="contentType" class="m-2" placeholder="Select Content Type" size="large" style="width: 240px">
            <el-option v-for="item in contentTypeOpts" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>
      </el-row>

      <el-row class="m-5">
        <el-col :span="4">
          <div class="flex-center"><h4>Request Body:</h4></div>
        </el-col>
        <el-col :span="12">
          <el-input v-model="requestBody" :rows="2" type="textarea" placeholder="input request body..." />
        </el-col>
      </el-row>

      <el-row class="m-5">
        <el-col :span="4">
          <div class="flex-center"><h4>Parameters:</h4></div>
        </el-col>
        <el-col :span="12">
          <el-row class="m-5">
            <el-col :span="4"><el-input v-model="key1" placeholder="key..." /></el-col>
            <el-col :span="4" style="display: flex; justify-content: center; align-items: center"> <label>=</label></el-col>
            <el-col :span="8"><el-input v-model="requestBody" placeholder="key1" /></el-col>
          </el-row>
          <el-row class="m-5">
            <el-col :span="4"><el-input v-model="key1" placeholder="key..." /></el-col>
            <el-col :span="4" style="display: flex; justify-content: center; align-items: center"> <label>=</label></el-col>
            <el-col :span="8"><el-input v-model="requestBody" placeholder="key1" /></el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="right-pane"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const httpMethod = ref('');
const contentType = ref('');
const requestBody = ref('');

const methodOpts = [
  {
    value: 'get',
    label: 'get',
  },
  {
    value: 'post',
    label: 'post',
  },
  {
    value: 'put',
    label: 'put',
  },
  {
    value: 'delete',
    label: 'delete',
  },
];

const contentTypeOpts = [
  {
    value: 'application/json; charset=UTF-8',
    label: 'application/json; charset=UTF-8',
  },
  {
    value: 'text/html; charset=utf-8',
    label: 'text/html; charset=utf-8',
  },
  {
    value: 'multipart/form-data',
    label: 'multipart/form-data',
  },
  {
    value: 'text/plain',
    label: 'text/plain',
  },
];
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  margin: 20px;
}
.left-pane {
  flex: 1;
  //   display: flex;
}
.right-pane {
  flex: 1;
  background-color: pink;
}

.flex-center {
  display: flex;
  align-items: center;
  margin: 10px;
}

.m-5 {
  margin: 5px;
}
</style>
