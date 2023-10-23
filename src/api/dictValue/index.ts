import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { DictValueQuery, DictValueForm } from "./types";

/**
 * 字典项分页列表
 * @param queryParam
 * @returns
 */
export function getDictValueList(
  queryParam: DictValueQuery
): AxiosPromise<DictValueQuery[]> {
  return request({
    url: "/dictValue/list",
    method: "get",
    params: queryParam,
  });
}

/**
 * 字典项下拉选项
 * @returns
 */
export function dictValueOption(typeCode: string): AxiosPromise<DictValueForm> {
  return request({
    url: "/dictValue/option" + typeCode,
    method: "get",
  });
}

/**
 * 新增字典项
 * @param data
 * @returns
 */
export function addDictValue(data: DictValueForm) {
  return request({
    url: "/dictValue/add",
    method: "post",
    data: data,
  });
}

/**
 * 编辑字典项
 * @param data
 * @returns
 */
export function editDictValue(data: DictValueForm) {
  return request({
    url: "/dictValue/edit",
    method: "put",
    data: data,
  });
}

/**
 * 删除字典项
 * @param params
 * @returns
 */
export function deleteDictValueByIds(ids: string[]) {
  return request({
    url: "/dictValue/delete/" + ids,
    method: "delete",
  });
}

/**
 * 字典项详情
 * @param {string} id id
 * @returns
 */
export function getDictValueDetail(id: string): AxiosPromise<DictValueForm> {
  return request({
    url: "/dictValue/detail/" + id,
    method: "get",
  });
}
