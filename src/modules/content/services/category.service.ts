import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '@/modules/content/repositories';
import { CategoryEntity } from '@/modules/content/entities';
import { EntityNotFoundError } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from '@/modules/content/dtos';
import { isNil, omit } from 'lodash';
import { BaseService } from '@/modules/database/base';

@Injectable()
export class CategoryService extends BaseService<
  CategoryEntity,
  CategoryRepository
> {
  constructor(protected repository: CategoryRepository) {
    super(repository);
  }

  /**
   * 查询分类树
   */
  async findTrees() {
    return this.repository.findTrees();
  }

  /**
   * 新增分类
   * @param data
   */
  async create(data: CreateCategoryDto) {
    const item = await this.repository.save({
      ...data,
      parent: await this.getParent(undefined, data.parent),
    });
    return this.detail(item.id);
  }

  /**
   * 更新分类
   * @param data
   */
  async update(data: UpdateCategoryDto) {
    await this.repository.update(data.id, omit(data, ['id', 'parent']));
    const item = await this.repository.findOneOrFail({
      where: { id: data.id },
      relations: ['parent'],
    });
    const parent = await this.getParent(item.parent?.id, data.parent);
    const shouldUpdateParent =
      (!isNil(item.parent) && !isNil(parent) && item.parent.id !== parent.id) ||
      (isNil(item.parent) && !isNil(parent)) ||
      (!isNil(item.parent) && isNil(parent));
    // 父分类单独更新
    if (parent !== undefined && shouldUpdateParent) {
      item.parent = parent;
      await this.repository.save(item, { reload: true });
    }
    return item;
  }

  /**
   * 获取请求传入的父分类
   * @param current 当前分类的ID
   * @param parentId
   */
  protected async getParent(current?: string, parentId?: string) {
    if (current === parentId) return undefined;
    let parent: CategoryEntity | undefined;
    if (parentId !== undefined) {
      if (parentId === null) return null;
      parent = await this.repository.findOne({ where: { id: parentId } });
      if (!parent)
        throw new EntityNotFoundError(
          CategoryEntity,
          `Parent category ${parentId} not exists!`,
        );
    }
    return parent;
  }
}
