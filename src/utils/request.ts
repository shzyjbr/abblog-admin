import axios from 'axios';
// import { ElMessage, ElMessageBox } from 'element-plus';
// import { localStorage } from '@/utils/storage';
// import { toRefs } from 'vue';

// 从状态层导出指定模块
// import useStore from '@/store';
// const { user } = useStore();

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000, // 请求超时时间：50s
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (!config.headers) {
      throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }

    console.log('这里是请求拦截器');

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    console.log('response:', response);
    const res = response.data;
    if (response.status === 200) {
      console.log('这里是响应拦截器， success');
      return res;
    } else {
      console.log('这里是响应拦截器， error');
      return Promise.reject(new Error(res || 'Error'));
    }
  },
  (error) => {
    console.log('请求异常：', error);
    const { msg } = error.response.data;
    return Promise.reject(new Error(msg || 'Error'));
  },
);

// 导出实例
export default service;
