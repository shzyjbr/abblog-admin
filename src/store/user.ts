import { defineStore } from 'pinia';
import { GlobalState } from '@/store/interface';

const useCounterStore = defineStore('user', {
  // 开启持久化
  persist: true,
  state() {
    return {
      userInfo: {},
      token: '',
      isLogin: false,
    };
  },
  actions: {
    getUserInfo() {
      return this.userInfo;
    },

    getToken() {
      return this.token;
    },

    saveUserState(userState: GlobalState) {
      this.userInfo = userState.userInfo;
      this.token = userState.token;
      console.log('saveUserState, success');
      this.isLogin = true;
    },
  },
});

export default useCounterStore;
