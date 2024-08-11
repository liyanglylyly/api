import { FindTreeOptions, SelectQueryBuilder } from 'typeorm';
import { CommentEntity } from '@/modules/content/entities';
import { CustomRepository } from '@/modules/database/decorators/repository.decorator';
import { QueryParams } from '@/modules/database/types';
import { isNil } from 'lodash';
import { BaseTreeRepository } from '@/modules/database/base';

@CustomRepository(CommentEntity)
export class CommentRepository extends BaseTreeRepository<CommentEntity> {
  protected _qbName = 'comment';

  protected orderBy = 'createdAt';

  /**
   * 构建基础查询器
   */
  buildBaseQB(
    qb: SelectQueryBuilder<CommentEntity>,
  ): SelectQueryBuilder<CommentEntity> {
    return super
      .buildBaseQB(qb)
      .leftJoinAndSelect(`${this.qbName}.post`, 'post');
  }

  async findTrees(
    options: FindTreeOptions &
      QueryParams<CommentEntity> & { post?: string } = {},
  ): Promise<CommentEntity[]> {
    const ops = {
      ...options,
      addQuery: async (qb) => {
        return isNil(options.post)
          ? qb
          : qb.where('post.id = :id', { id: options.post });
      },
    };
    return super.findTrees(ops);
  }
}
