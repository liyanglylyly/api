/**
 * 文章内容类型
 */
export enum PostBodyType {
  HTML = 'html',
  MD = 'markdown',
}

/**
 * 文章排序类型
 */
export enum PostOrderType {
  CREATED = 'createdAt',
  UPDATED = 'updatedAt',
  PUBLISHED = 'publishedAt',
  COMMENT_COUNT = 'commentCount',
  CUSTOM = 'custom',
}

export enum CategoryStatus {
  ONLINE = 1,
  OFFLINE = 2,
}
