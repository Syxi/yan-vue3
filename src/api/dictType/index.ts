import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { DictTypeQuery, DictTypeForm } from "./types";

/**
 * 字典类型分页列表
 * @param queryParam
 * @returns
 */
export function getDictTypeList(
  queryParam: DictTypeQuery
): AxiosPromise<DictTypeQuery[]> {
  return request({
    url: "/dictType/list",
    method: "get",
    params: queryParam,
  });
}

/**
 * 新增字典类型
 * @param data
 * @returns
 */
export function addDictType(data: DictTypeForm) {
  return request({
    url: "/dictType/add",
    method: "post",
    data: data,
  });
}

/**
 * 编辑字典类型
 * @param data
 * @returns
 */
export function editDictType(data: DictTypeForm) {
  return request({
    url: "/dictType/edit",
    method: "put",
    data: data,
  });
}

/**
 * 删除字典
 * @param params
 * @returns
 */
export function deleteDictTypeByIds(ids: string[]) {
  return request({
    url: "/dictType/delete/" + ids,
    method: "delete",
  });
}

/**
 * 字典详情
 * @param {string} id id
 * @returns
 */
export function getDictTypeDetail(id: string): AxiosPromise<DictTypeForm> {
  return request({
    url: "/dictType/detail/" + id,
    method: "get",
  });
}
