import { createRouter, createWebHashHistory } from 'vue-router';

// 本地静态路由
export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    meta: {
      isParentView: true,
    },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/layout/components/dashboard/index.vue'),
        meta: {
          isParentView: false,
        },
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/layout/components/user/index.vue'),
        meta: {
          isParentView: false,
        },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      isParentView: true,
    },
  },
  {
    // path: '/404',
    path: '/:pathMatch(.*)*', // 防止浏览器刷新时路由未找到警告提示: vue-router.mjs:35 [Vue Router warn]: No match found for location with path "/xxx"
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      isParentView: true,
    },
  },
];

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

export default router;
