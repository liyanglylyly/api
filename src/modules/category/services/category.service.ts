import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseService } from '@/modules/database/base';
import { CategoryEntity } from '@/modules/category/entities';
import { CategoryRepository } from '@/modules/category/repositories';
import {
  CreateCategoryDto,
  PageCategorydto,
  UpdateCategoryDto,
} from '@/modules/category/dtos';
import { omit } from 'lodash';

@Injectable()
export class CategoryService extends BaseService<
  CategoryEntity,
  CategoryRepository
> {
  constructor(protected repo: CategoryRepository) {
    super(repo);
  }

  async create(data: CreateCategoryDto): Promise<CategoryEntity> {
    let cate = await this.repo.findOne({
      where: { name: data.name },
    });
    if (cate) {
      throw new HttpException('该分类已经存在', HttpStatus.BAD_REQUEST);
    }

    let parent = null;
    if (data.parent) {
      parent = await this.repo.findOne({
        where: { id: data.parent },
      });
      if (!parent) {
        throw new HttpException(
          '该父分类不存在',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    try {
      cate = await this.repo.save({
        ...data,
        parent,
      });
      return this.detail(cate.id);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async paginate(data: PageCategorydto) {
    return await super.paginate(data, async (qb) =>
      qb.leftJoinAndSelect(`${this.repo.qbName}.parent`, 'parent'),
    );
  }

  async update(data: UpdateCategoryDto) {
    const category = await this.repo
      .buildBaseQB()
      .where(`${this.repo.qbName}.id = :id`, { id: data.id })
      .getOne();
    if (!category) {
      throw new NotFoundException('该分类不存在');
    }
    const d = omit(data, ['parent']);
    let parent: CategoryEntity = null;
    if (data.parent) {
      parent = await this.repo.findOne({
        where: { id: data.parent },
      });
    }
    const entity = {
      ...d,
      parent,
    } as CategoryEntity;
    try {
      await this.repo
        .buildBaseQB()
        .update(CategoryEntity)
        .set(entity)
        .where('id = :id', { id: data.id })
        .execute();
      return await this.detail(data.id);
    } catch (e) {
      throw new HttpException('更新失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
