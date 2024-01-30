import { defineStore } from 'pinia';
import { GlobalState } from '@/store/interface';

export const useCounterStore = defineStore('user', {
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
      this.isLogin = true;
    },
  },
});
