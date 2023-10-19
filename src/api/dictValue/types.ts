/**
 * 字典类型查询对象
 */
export interface DictValueQuery {
    dictName?: string;
}



/** 
 * 字典项表达对象
 * @param {object} params dictValueForm
 * @param {string} params.dictName 字典名称
 * @param {string} params.dictValue 字典值
 * @param {string} params.id 字典ID
 * @param {string} params.remark 字典备注
 * @param {number} params.sort 排序
 * @param {number} params.status 状态(0:启用;1:禁用)
 * @param {string} params.typeCode 类型编码
 * @returns
 */
export interface DictValueForm {
    dictName?: string;
    dictValue?: string;
    id?: string;
    remark?: string;
    sort?: number;
    status?: number;
    typeCode?: string;
  }
  