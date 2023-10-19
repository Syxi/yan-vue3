import { defineStore } from "pinia";

import { resetRouter } from "@/router"
import { loginApi, logoutApi } from "@/api/login";
import { getUserInfoApi } from "@/api/user";
import { store } from "@/store";

import { LoginData } from "@/api/login/types";
import { UserInfo } from "@/api/user/types";
import { useStorage } from "@vueuse/core";



export const useUserStore = defineStore("user", () => {
    const user: UserInfo = {
        roles: [],
        perms: [],
    };

    const token = useStorage("accessToken", "");


    // 登录
    function login(loginData: LoginData) {
        return new Promise<void>((resolve, reject) => {
            loginApi(loginData).then((response) => {
                const { tokenType, accessToken } = response.data;
                token.value = tokenType + " " + accessToken;
                resolve();
            }).catch((error) => {
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
            }).catch((error) => {
                reject(error);
            });
        });
    }


    // 清空缓存
    function resetStore() {
        resetRouter();
        token.value = '';
        // Object.assign(target, ...sources) 用于对象合并，将源对象中的属性复制到目标对象中，将返回目标对象
        Object.assign(user, { roles: [], perms: [] });
    }

    function getUserInfo() {
        return new Promise<UserInfo>((resolve, reject) => {
            getUserInfoApi().then(({ data }) => {
                if (!data) {
                    reject("Verification failed, please Login again");
                    return;
                }
                if (!data.roles || data.roles.length <= 0) {
                    reject("getUserInfo: roles must be a non-null array");
                    return;
                }
                Object.assign(user, { ...data });
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    return {
        token,
        user,
        login,
        logout,
        resetStore,
        getUserInfo,
    }

});

// 非 setup
export function useUserStoreHook() {
    return useUserStore(store);
}