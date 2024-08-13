import { BaseRepository } from '@/modules/database/base';
import { CategoryEntity } from '@/modules/category/entities';
import { CustomRepository } from '@/modules/database/decorators';

@CustomRepository(CategoryEntity)
export class CategoryRepository extends BaseRepository<CategoryEntity> {
  protected _qbName = 'category';
}
