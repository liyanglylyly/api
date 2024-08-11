export const CUSTOM_REPOSITORY_METADATA = 'CUSTOM_REPOSITORY_METADATA';

/**
 * 排序方式
 * */
export enum OrderType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum TreeChildrenResolve {
  /**
   * 在删除父节点时同时删除它的子孙节点
   * */
  DELETE = 'DELETE',

  /**
   * 在删除父节点时把它的子孙节点提升一级
   * */
  UP = 'UP',

  /**
   * 在删除父节点时把它的子节点提升为顶级节点
   * */
  ROOT = 'ROOT',
}

export enum SelectTrashMode {
  /**
   * 包含已软删除和未软删除的数据（同时查询正常数据和回收站中的数据）
   * */
  ALL = 'ALL',

  /**
   * 只包含软删除的数据 （只查询回收站中的数据）
   * */
  ONLY = 'ONLY',

  /**
   * 只包含未软删除的数据 （只查询正常数据）
   * */
  NONE = 'NONE',
}
