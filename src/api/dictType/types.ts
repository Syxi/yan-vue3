/**
 * 字典类型查询对象
 */
export interface DictTypeQuery {
  name?: string;
  code?: string;
}

/**
 * 字典类型表达对象
 * @param {object} params dictTypeForm
 * @param {string} params.code 类型编码
 * @param {string} params.id 字典类型ID
 * @param {string} params.name 类型名称
 * @param {string} params.remark 备注
 * @param {number} params.status 类型状态(0:启用;1:禁用)
 * @returns
 */
export interface DictTypeForm {
  code?: string;
  id?: string;
  name?: string;
  remark?: string;
  status?: number;
}
