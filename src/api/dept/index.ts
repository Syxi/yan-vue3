import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import { DeptQuery, DeptVO, DeptForm } from './types';


/**
 * 部门分页列表
 * @returns 
 */
export function getDeptList(data: DeptQuery): AxiosPromise<DeptQuery[]> {
    return request({
        url: '/dept/List',
        method: 'get',
        data: data
    });
  }



  /**
   * 部门下拉选项
   * @returns 
   */
export function deptOption(): AxiosPromise<[]> {
    return request({
        url: '/dept/option',
        method: 'get',
    })
}


/**
 * 新增部门
 * @param data 
 * @returns 
 */
export function addDept(data: DeptForm) {
    return request({
        url: '/dept/add',
        method: 'post',
        data: data
    });
  }



/**
 * 编辑部门
 * @param data 
 * @returns 
 */
export function editDept(data: DeptForm) {
    return request({
        url: '/dept/edit',
        method: 'put',
        data: data
    });
  }


/** 
 * 删除部门
 * @param {string} deptId deptId
  * @returns
 */
export function deleteDeptById(deptId: string) {
    return request({
        url: '/dept/delete/' + deptId,
        method: 'delete'
    });
  }  



/** 
 * 部门详情
 * @param {string} deptId deptId
  * @returns
 */
export function getDeptDetail(deptId: string): AxiosPromise<DeptVO> {
    return request({
        url: '/dept/detail/' + deptId,
        method: 'get'
    });
  } 
