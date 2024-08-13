import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '@/modules/database/base';
import { CategoryEntity } from '@/modules/category/entities';
import { CategoryRepository } from '@/modules/category/repositories';
import { CreateCategoryDto } from '@/modules/category/dtos';

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
}
