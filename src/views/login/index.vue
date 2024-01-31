<template>
  <div class="bg-color-primary flex-center-center center-div">
    <div class="flex-c-center-center b-rd-10 form-div">
      <h1 class="font-size-lg">abblog-admin</h1>
      <div class="m-t-20">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" prefix-icon="User" placeholder="请输入账号" maxlength="30" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" prefix-icon="Lock" placeholder="请输入密码" show-password maxlength="30" />
          </el-form-item>
        </el-form>
        <div class="tips">
          <span>演示用户名: admin</span>
          <span class="m-l-20"> 密码: 123456</span>
        </div>
        <el-button type="primary" class="m-t-10 w-full" color="#626aef" @click="onFinish(loginForm)">登 录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 从状态层导出指定模块
import { Login } from '@/api/interface';
import { loginApi } from '@/api/modules/login';
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import useStore from '@/store';
import { useRouter } from 'vue-router';
const router = useRouter();

const { user } = useStore();

function validatePassword(rule, value, callback) {
  if (!value || value.length < 6) {
    callback(new Error('密码最少6位'));
  } else {
    callback();
  }
}

const loginRules = {
  username: [{ required: true, trigger: 'change', message: '请输入账号' }],
  password: [{ required: true, trigger: 'change', validator: validatePassword }],
};

let loginForm = reactive({
  username: '',
  password: '',
});

// 登录
const onFinish = async (loginForm: Login.ReqLoginForm) => {
  try {
    // 发送登录请求
    const { status, result } = await loginApi(loginForm);
    if (status && status.code == 0 && result && result.userId > 0) {
      console.log(result);
      ElMessage.success('登录成功');
      // 保存登录信息
      let userState = { token: '1234567', userInfo: result };
      user.saveUserState(userState);
      console.log(user.isLogin);
      router.push('/');
    } else {
      ElMessage.success('登录失败:' + status?.msg);
    }
  } finally {
    console.log('finally');
  }
};
</script>

<style lang="scss" scoped>
.center-div {
  width: 100%;
  height: 100%;
  // background-image: url('@/assets/login_bg-05f3b32a.svg');
  background: url('@/assets/login_bg-05f3b32a.svg') no-repeat top center;

  .form-div {
    height: 400px;
    width: 400px;
    background-color: #0435fc3b;
  }
}
</style>
