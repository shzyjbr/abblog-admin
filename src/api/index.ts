import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { PaiRes, ResultData } from '@/api/interface';

const config = {
  // 默认地址请求地址，可在 .env 开头文件中修改，在 Axios 中使用
  // 实例化的使用用到
  baseURL: import.meta.env.VITE_API_URL as string,
  // 跨域时候允许携带凭证
  withCredentials: true,
};

class RequestHttp {
  service: AxiosInstance;

  // 构造方法
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config);

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的token,存储到redux/本地储存当中
     */
    // 请求拦截器
    this.service.interceptors.request.use(
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
    this.service.interceptors.response.use(
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
  }

  // * 常用请求方法封装， 可以传入headers, 比如 service.get(url, params, heads)
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    console.log('开始执行get 请求', url, params, _object);
    return this.service.get(url, { params, ..._object });
  }
  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }

  postForm<T>(url: string, params?: object, _object = {}): Promise<PaiRes<T>> {
    return this.service.post(url, params, _object);
  }

  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }
}

export default new RequestHttp(config);
