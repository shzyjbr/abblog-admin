import { defineStore } from 'pinia';

export default defineStore('user', {
  state() {
    return {
      userList: [] as IUser[],
    };
  },
  actions: {
    getList() {
      // 模拟从后端获取数据
      this.userList = [
        { name: '张三', age: 18 },
        { name: '王五', age: 19 },
      ];
      return this.userList;
      //   resList[0].name  此时resList[0]只能点出 name 或 age
    },
  },
});
