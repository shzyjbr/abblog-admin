import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 获取`.env`环境配置文件
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      eslint({ lintOnStart: false, cache: false }), // 项目运行时进行eslint检查
    ],
    resolve: {
      alias: {
        // 这里就是需要配置resolve里的别名
        '@': path.join(__dirname, './src'), // path记得引入
        // 'vue': 'vue/dist/vue.esm-bundler.js' // 定义vue的别名，如果使用其他的插件，可能会用到别名
      },
    },

    // 反向代理解决跨域问题
    server: {
      host: 'localhost', // 只能本地访问
      // host: '0.0.0.0', // 局域网别人也可访问
      port: Number(env.VITE_APP_PORT),
      // 运行时自动打开浏览器
      open: true,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_SERVICE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), ''),
        },
      },
    },
    // 引入scss全局变量
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/color.scss";@import "@/styles/theme.scss";`,
        },
      },
    },
  };
});
