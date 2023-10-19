import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { CaptchaResult, LoginData, LoginResult } from './types';


/**
 * 登录
 * @param data 
 * @returns 
 */
export function loginApi(data: LoginData): AxiosPromise<LoginResult> {
    return request({
        url: '/api/login',
        method: 'post',
        data: data
    })
}



/**
 * 注销登录
 * @returns 
 */
export function logoutApi() {
    return request({
        url: 'api/loginout',
        method: 'delete'
    })
}



/**
 * 获取验证码
 * @returns 
 */
export function getCaptchaApi(): AxiosPromise<CaptchaResult> {
    return request({
        url: 'api/captcha',
        method: 'get'
    })
}