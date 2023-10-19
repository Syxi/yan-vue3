/**
 * 角色查询对象
 *  @param {string} roleCode 角色编码
  * @param {string} roleName 角色名称
 */
export interface RoleQuery {
    roleCode?: string;
    roleName?: string;

}


/**
 * 角色表格分页对象
 * @param {string} params.rleId 角色ID
 * @param {string} params.roleCode 角色编码
 * @param {string} params.roleName 角色名称
 * @param {number} params.sort 排序
 * @param {number} params.status 角色状态(0:正常；1:停用)
 * @param {Date} params.createTime 创建时间
 * @param {Date} params.updateTime 更新时间
 */
export interface RolePage {
    roleId?: string;
    roleCode?: string;
    roleName?: string;
    sort?: number;
    status?: number;
    createTime?: Date;
    updateTime?: Date;
    
}


/**
 * 角色添加、编辑表单对象
 * @param {object} params roleForm
 * @param {string} params.rleId 角色ID
 * @param {string} params.roleCode 角色编码
 * @param {string} params.roleName 角色名称
 * @param {number} params.sort 排序
 * @param {number} params.status 角色状态(0:正常；1:停用)
 * @returns
 */
export interface RoleForm {
    rleId?: string;
    roleCode?: string;
    roleName?: string;
    sort?: number;
    status?: number;
    
}