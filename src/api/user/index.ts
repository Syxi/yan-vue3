import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import { UserInfo, UserQuery, UserPage, UserForm } from './types'



/**
 * 登录成功后，获取用户信息（昵称、头像、权限集合、角色集合）
 * @returns 
 */
export function getUserInfoApi(): AxiosPromise<UserInfo> {
    return request({
        url: 'user/userInfo',
        method: 'get'
    })
}


/**
 * 获取用户分页列表
 * @param queryParams 
 * @returns 
 */
export function getUserListApi(queryParams: UserQuery) : AxiosPromise<PageResult<UserPage[]>> {
    return request({
        url: '/user/getUserList',
        method: 'get',
        params: queryParams
    });
}


/**
 *  获取用户详情
 * @param userId 
 */
export function getUserDetailApi(userId: string) : AxiosPromise<UserForm> {
    return request({
        url: '/user/info/' + userId ,
        method: 'get',
    });
}


/**
 * 新增用户
 * @param data  
 * @returns 
 */
export function addUserApi(data: any) {
    return request({
        url: 'user/add',
        method: 'post',
        data: data
    });
}


/**
 * 编辑用户
 * @param data 
 * @returns 
 */
export function editUserApi(userId: string, data: UserForm) {
    return request({
        url: '/user/edit' + userId,
        method: 'put',
        data: data
    });
}


/**
 *  删除用户
 * @param userIds 
 * @returns 
 */
export function deleteUserApi(userIds: string) {
    return request({
        url: 'user/delete' + userIds,
        method: 'delete'
    });
}


/**
 * 用户状态，0：正常，1：禁用
 * @param data 
 * @returns 
 */
export function updateUserStatusApi(userId: string, status: number) {
    return request({
        url: 'user/status/' + userId,
        method: 'put',
        params: { status: status }
    });
}


/**
 * 重置密码
 * @param userId 
 */
export function resetPwdApi(userId: string, password: string) {
    return request({
        url: 'user/resetPwd/' + userId,
        method: 'put',
        params: { password: password }
    })
}

