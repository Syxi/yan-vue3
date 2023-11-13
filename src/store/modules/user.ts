import { loginApi, logoutApi } from "@/api/login";
import { LoginData } from "@/api/login/types";
import { getUserInfoApi } from "@/api/user";
import { UserInfo } from "@/api/user/types";
import { resetRouter } from "@/router";
import { defineStore } from "pinia";
import { store } from "@/store"


export const useUserStore = defineStore('user', () => {

  const user: UserInfo = {
    roles: [],
    perms: []
  }

  // 本地内存存储
  const token = useStorage("accessToken", "");


  /**
   * 登录
   * @param loginData 
   * @returns 
   */
  function login(loginData: LoginData) {
    return new Promise<void>((resolve, reject) => {
      loginApi(loginData).then((response) => {
        const { tokenType, accessToken } = response.data;
        // Bearer eyJhbFcioiJui1nIj9.XXX.XXX
        token.value = tokenType + " " + accessToken;
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
    });
  }



  // 注销
  function logout() {
    return new Promise<void>((resolve, reject) => {
      logoutApi().then(() => {
        // 清空缓存
        resetStore();
        // 清空路由
        location.reload();
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
    });
  }


  // 清空缓存
  function resetStore() {
    resetRouter();
    token.value = "";
    Object.assign(user, { roles: [], perms: [] });
  }


  //获取用户信息(用户昵称、头像、角色集合、权限集合)
  function getUserInfo() {
    return new Promise<UserInfo>((resolve, reject) => {
      getUserInfoApi().then(({ data }) => {
        if (!data) {
          reject("Verifiction faild, please login again");
          return;
        }
        if (!data.roles || data.roles.length < 0) {
          reject("getUserInfo: roles must be a non-null array!");
          return;
        }

        Object.assign(user, { ...data });
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      })
    })
  }


  return {
    user,
    token,
    login,
    logout,
    resetStore,
    getUserInfo
  }


});


export function useUserStoreHook() {
  return useUserStore(store);
}