import { MenuTypeEnum } from "src/enums/MenuTypeEnum";

/**
 * 菜单查询对象类型
 */
export interface MenuQuery {
  menuName?: string;
}

/**
 * 菜单试图对象类型
 * @param {object} params MenuVO
 * @param {string} params.componentPath 组件路径
 * @param {string} params.icon 菜单图标
 * @param {string} params.menuId 菜单ID
 * @param {string} params.menuName 菜单名称
 * @param {string} params.menuType 菜单类型(1-菜单；2-目录；3-外链；4-按钮权限)
 * @param {string} params.parentId 父菜单ID
 * @param {string} params.permission 权限标识
 * @param {string} params.redirect 跳转路径
 * @param {string} params.routeName 路由名称
 * @param {string} params.routePath 路由相对路径
 * @param {number} params.sort 菜单排序(数字越小排名越靠前)
 * @param {number} params.status 菜单是否可见(0:显示;1:隐藏)
 * @param {number} params.children 子菜单
 * @returns
 */
export interface MenuVO {
  componentPath?: string;
  icon?: string;
  menuId?: string;
  menuName?: string;
  menuType?: MenuTypeEnum;
  parentId?: string;
  permission?: string;
  redirect?: string;
  routeName?: string;
  routePath?: string;
  sort?: number;
  status?: number;
  children?: MenuVO[];
}

/**
 * 菜单表单对象类型
 * @param {object} params MenuForm
 * @param {string} params.componentPath 组件路径
 * @param {string} params.icon 菜单图标
 * @param {string} params.menuId 菜单ID
 * @param {string} params.menuName 菜单名称
 * @param {string} params.menuType 菜单类型(1-菜单；2-目录；3-外链；4-按钮权限)
 * @param {string} params.parentId 父菜单ID
 * @param {string} params.permission 权限标识
 * @param {string} params.redirect 跳转路径
 * @param {string} params.routePath 路由相对路径
 * @param {number} params.sort 菜单排序(数字越小排名越靠前)
 * @param {number} params.status 菜单是否可见(0:显示;1:隐藏)
 * @returns
 */
export interface MenuForm {
  componentPath?: string;
  icon?: string;
  menuId?: string;
  menuName?: string;
  menuType?: MenuTypeEnum;
  parentId?: string;
  permission?: string;
  redirect?: string;
  routePath?: string;
  sort?: number;
  status?: number;
}
