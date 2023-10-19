/**
 * 登录用户信息参数
 * @param {number} params.userId 用户名
 * @param {string} params.username 用户名
 * @param {string} params.avatar 头像
 * @param {string[]} params.role 角色集合
 * @param {string[]} params.permission 权限集合
 */
export interface UserInfo {
    userId?: number;
    username?: string;
    realName?: string;
    avatar?: string;
    roles: string[];
    perms: string[];
}


/**
 * 用户查询参数对象
 * @param {string} params.username 用户名
 * @param {string} params.mobile 
 * @param {string} params.realName 昵称
 * @param {number} params.status 用户状态(0:正常;1:禁用)
 * @param {string} params.deptName 部门名称
 */
export interface UserQuery extends PageQuery {
    username?: string;
    mobile?: string;
    realName?: string;
    status?: number;
    deptName?: string;
   
} 


/**
 *  分页表格用户参数对象
 * @param {object} params userPage
 * @param {string} params.userId 用户ID
 * @param {string} params.username 用户名
 * @param {string} params.avatar 用户头像
 * @param {string} params.email 邮箱
 * @param {number} params.gender 性别
 * @param {string} params.mobile 
 * @param {string} params.realName 昵称
 * @param {number} params.status 用户状态(0:正常;1:禁用)
 * @param {string} params.deptName 部门名称
 * @param {Date} params.createTime 创建时间
 * @returns
 */
export interface UserPage {
    userId?: string;
    username?: string;
    avatar?: string;
    email?: string;
    gender?: number;
    mobile?: string;
    realName?: string;
    status?: number;
    deptName?: string;
    createTime?: Date;
}


/**
 * 编辑、新增表单用户参数
 * @param {object} params userForm
 * @param {string} params.userId 用户ID
 * @param {string} params.username 用户名
 * @param {string} params.avatar 用户头像
 * @param {string} params.email 邮箱
 * @param {number} params.gender 性别
 * @param {string} params.mobile 
 * @param {string} params.realName 昵称
 * @param {number} params.status 用户状态(0:正常;1:禁用)
 * @param {string} params.deptName 部门名称
 * @param {Date} params.roleIds 角色id数组
 * @returns
 */
export interface UserForm {
    userId?: string;
    username?: string;
    avatar?: string;
    email?: string;
    gender?: number;
    mobile?: string;
    realName?: string;
    status?: number;
    deptId?: string;
    roleIds?: string[];
    
}