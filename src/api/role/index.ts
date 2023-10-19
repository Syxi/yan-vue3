import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import { RoleQuery, RolePage, RoleForm } from './types'


/**
 * 角色表格分页列表
 * @param queryParams 
 * @returns 
 */
export function getRoleList(queryParams: RoleQuery): AxiosPromise<PageResult<RolePage[]>> {
    return request ({
        url: '/role/getRoleList',
        method: 'get',
        params: queryParams
    });
}


/**
 * 角色下拉选项
 */
export function roleOption(queryParams?: RoleQuery): AxiosPromise<OptionType[]> {
    return request({
        url: '/role/option',
        method: 'get',
        params: queryParams
    });
}



/**
 * 角色详情
 * @param roleId 
 * @returns 
 */
export function getRoleDetail(roleId: string): AxiosPromise<RoleForm> {
    return request({
        url: `/role/detail/${roleId}`,
        method: 'get'
    });
  }



/**
 * 
 * 新增角色
 * @returns 
 */
export function addRole(data: RoleForm) {
    return request({
        url: '/role/add',
        method: 'post',
        data: data
    });
  }


/**
 * 更新角色
 * @param data 
 * @returns 
 */
export function editRole(data: RoleForm) {
    return request({
        url: `/role/edit`,
        method: 'put',
        data: data
    });
  }


/**
 * 删除角色
 * @param roleId 
 * @returns 
 */
export function deleteRoleById(roleId: string) {
    return request({
        url: '/role/delete/' + roleId,
        method: 'delete',
    });
  }



/**
 * 更新角色状态（0：正常，1：禁用）
 * @param roleId 
 * @param status 
 * @returns 
 */  
export function updateRoleStatus(roleId: string, status: number) {
    return request({
        url: '/role/status/' + roleId + status,
        method: 'put',
    });
  }


/**
 * 获取角色的菜单id集合
 * @param roleId 
 * @returns 
 */
export function getMenuIdsByRoleId(roleId: string): AxiosPromise<string[]> {
    return request({
        url: '/role/getMenuIds/' + roleId,
        method: 'get'
    });
  }


/**
 * 角色分配菜单
 * @param roleId 
 * @param params 
 * @returns 
 */
export function updateRoleMenus(roleId: string, data: string[]): AxiosPromise<any> {
    return request({
        url: '/role/permission/' + roleId,
        method: 'put',
        data: data
    });
  }  