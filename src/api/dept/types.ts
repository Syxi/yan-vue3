/**
 * 部门查询对象
 */
export interface DeptQuery {
    deptName?: string
}



/**
 * 部门表单对象
 * @param {object} params deptForm
 * @param {string} params.deptId 部门ID
 * @param {string} params.deptName 部门名称
 * @param {string} params.parentId 父部门ID
 * @param {number} params.sort 排序(数字越小排名越靠前)
 * @param {number} params.status 状态(0:启用;1:禁用)
 * @param {object} params DeptVO 子部门
 */
export interface DeptVO {
    deptId?: string;
    deptName?: string;
    parentId?: string;
    sort?: number;
    status?: number;
    children?: DeptVO[];
    createTime?: Date;
    updateTime?: Date;
  }




/**
 * 部门表单对象
 * @param {object} params deptForm
 * @param {string} params.deptId 部门ID
 * @param {string} params.deptName 部门名称
 * @param {string} params.parentId 父部门ID
 * @param {number} params.sort 排序(数字越小排名越靠前)
 * @param {number} params.status 状态(0:启用;1:禁用)
 */
export interface DeptForm {
    deptId?: string;
    deptName?: string;
    parentId?: string;
    sort?: number;
    status?: number;
  }