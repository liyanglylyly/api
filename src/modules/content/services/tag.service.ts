import { Injectable } from '@nestjs/common';
import { TagRepository } from '@/modules/content/repositories';
import { CreateTagDto, UpdateTagDto } from '@/modules/content/dtos';
import { omit } from 'lodash';
import { BaseService } from '@/modules/database/base';
import { TagEntity } from '@/modules/content/entities';

/**
 * 标签数据操作
 */
@Injectable()
export class TagService extends BaseService<TagEntity, TagRepository> {
  constructor(protected repository: TagRepository) {
    super(repository);
  }

  /**
   * 查询单个标签信息
   * @param id
   */
  async detail(id: string) {
    const qb = this.repository.buildBaseQB();
    qb.where(`tag.id = :id`, { id });
    return qb.getOneOrFail();
  }

  /**
   * 创建标签
   * @param data
   */
  async create(data: CreateTagDto) {
    const item = await this.repository.save(data);
    return this.detail(item.id);
  }

  /**
   * 更新标签
   * @param data
   */
  async update(data: UpdateTagDto) {
    await this.repository.update(data.id, omit(data, ['id']));
    return this.detail(data.id);
  }
}
