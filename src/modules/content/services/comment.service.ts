import { ForbiddenException, Injectable } from '@nestjs/common';
import {
  CommentRepository,
  PostRepository,
} from '@/modules/content/repositories';
import {
  CreateCommentDto,
  QueryCommentDto,
  QueryCommentTreeDto,
} from '@/modules/content/dtos';
import { isNil } from 'lodash';
import { EntityNotFoundError, SelectQueryBuilder } from 'typeorm';
import { CommentEntity } from '@/modules/content/entities';
import { treePaginate } from '@/modules/database/helpers';
import { BaseService } from '@/modules/database/base';

/**
 * 评论数据操作
 */
@Injectable()
export class CommentService extends BaseService<
  CommentEntity,
  CommentRepository
> {
  constructor(
    protected repository: CommentRepository,
    protected postRepository: PostRepository,
  ) {
    super(repository);
  }

  /**
   * 直接查询评论树
   * @param options
   */
  async findTrees(options: QueryCommentTreeDto) {
    return this.repository.findTrees(options);
  }

  /**
   * 查找一篇文章的评论并分页
   * @param options
   */
  async paginate(options: QueryCommentDto) {
    const { post } = options;
    const addQuery = (qb: SelectQueryBuilder<CommentEntity>) => {
      const condition: Record<string, string> = {};
      if (!isNil(post)) condition.post = post;
      return Object.keys(condition).length > 0 ? qb.andWhere(condition) : qb;
    };
    const ops = {
      ...options,
      addQuery,
    };
    return super.paginate(ops);
  }

  /**
   * 新增评论
   * @param data
   */
  async create(data: CreateCommentDto) {
    const parent = await this.getParent(undefined, data.parent);
    if (!isNil(parent) && parent.post.id !== data.post) {
      throw new ForbiddenException(
        'Parent comment and child comment must belong same post!',
      );
    }
    const item = await this.repository.save({
      ...data,
      parent,
      post: await this.getPost(data.post),
    });
    return this.repository.findOneOrFail({ where: { id: item.id } });
  }

  /**
   * 获取评论所属文章实例
   * @param id
   */
  protected async getPost(id: string) {
    return !isNil(id)
      ? this.postRepository.findOneOrFail({ where: { id } })
      : id;
  }

  /**
   * 获取请求传入的父分类
   * @param current 当前分类的ID
   * @param id
   */
  protected async getParent(current?: string, id?: string) {
    if (current === id) return undefined;
    let parent: CommentEntity | undefined;
    if (id !== undefined) {
      if (id === null) return null;
      parent = await this.repository.findOne({
        relations: ['parent', 'post'],
        where: { id },
      });
      if (!parent) {
        throw new EntityNotFoundError(
          CommentEntity,
          `Parent comment ${id} not exists!`,
        );
      }
    }
    return parent;
  }
}
