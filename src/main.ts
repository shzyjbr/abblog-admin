import { createApp } from 'vue';
import '@/styles/index.scss';
import App from './App.vue';

const app = createApp(App);

// 路由
import router from '@/router';
app.use(router);

app.mount('#app');
