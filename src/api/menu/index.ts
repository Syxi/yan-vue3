import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import { MenuQuery, MenuVO, MenuForm } from './types'


/**
 * 菜单树形列表
 * @param queryParams 
 * @returns 
 */
export function getMenuList(queryParams: MenuQuery): AxiosPromise<MenuVO[]> {
    return request({
        url: '/menu/list',
        method: 'get',
        params: queryParams
    }) 
}


/** 
 * 菜单下拉列表
 * @returns
 */
export function menuOption(): AxiosPromise<OptionType> {
    return request({
        url: '/menu/option',
        method: 'get'
    });
  }


/** 
 * 路由列表
 * @returns
 */
export function listRoutesApi() {
    return request({
        url: '/menu/routes',
        method: 'get'
    });
  }


 /** 
 * 菜单详情
 * @param {string} menuId menuId
  * @returns
 */
export function getMenuDetail(menuId: string): AxiosPromise<MenuVO> {
    return request({
        url: '/menu/form/' + menuId,
        method: 'get'
    });
  } 



 /**
  * 新增菜单
  * @param data 
  * @returns 
  */ 
export function addMenu(data: MenuForm) {
    return request({
        url: '/menu/add', 
        method: 'post',
        data: data
    });
  }



/**
 * 编辑菜单
 * @param data 
 * @returns 
 */
export function editMenu(data: MenuForm) {
    return request({
        url: '/menu/edit',
        method: 'put',
        data: data
    });
  } 
  
  
/** 
 * 删除菜单
 * @param {string} menuId menuId
  * @returns
 */
export function deleteMenuById(menuId: string) {
    return request({
        url: '/menu/delete/' + menuId,
        method: 'delete'
    });
  }  

