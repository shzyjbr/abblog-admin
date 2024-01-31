import { createApp } from 'vue';
// 自定义样式
import '@/styles/index.scss';
import App from './App.vue';

const app = createApp(App);

// 路由
import router from '@/router';
app.use(router);

// element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
app.use(ElementPlus);
// 注册所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// pinia
import { createPinia } from 'pinia';
// pinia持久化
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

// 配置全局api
import api from '@/api';
app.config.globalProperties.$api = api;

import store from '@/store';
app.config.globalProperties.$store = store;

app.config.globalProperties.$router = router;
app.mount('#app');
