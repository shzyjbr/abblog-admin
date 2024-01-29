import { ElMessage } from 'element-plus';
/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatus = (status: number): void => {
  switch (status) {
    case 400:
      ElMessage({
        message: '请求失败！请您稍后重试.',
        type: 'error',
      });
      break;
    case 401:
      ElMessage({
        message: '登录失效！请您重新登录',
        type: 'error',
      });
      break;
    case 403:
      ElMessage({
        message: '当前账号无权限访问！',
        type: 'error',
      });
      break;
    case 404:
      ElMessage({
        message: '你所访问的资源不存在！',
        type: 'error',
      });
      break;
    case 405:
      ElMessage({
        message: '请求方式错误！请您稍后重试',
        type: 'error',
      });
      break;
    case 408:
      ElMessage({
        message: '请求超时！请您稍后重试',
        type: 'error',
      });
      break;
    case 500:
      ElMessage({
        message: '服务异常！',
        type: 'error',
      });
      break;
    case 502:
      ElMessage({
        message: '网关错误！',
        type: 'error',
      });
      break;
    case 503:
      ElMessage({
        message: '服务不可用！',
        type: 'error',
      });
      break;
    case 504:
      ElMessage({
        message: '网关超时！',
        type: 'error',
      });
      break;
    default:
      ElMessage({
        message: '请求失败！',
        type: 'error',
      });
  }
};
