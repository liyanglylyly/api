import { CustomRepository } from '@/modules/database/decorators/repository.decorator';
import { CategoryEntity } from '@/modules/content/entities';

import { OrderType, TreeChildrenResolve } from '@/modules/database/constants';
import { isNil, unset } from 'lodash';
import { BaseTreeRepository } from '@/modules/database/base';

@CustomRepository(CategoryEntity)
export class CategoryRepository extends BaseTreeRepository<CategoryEntity> {
  protected orderBy = { name: 'customOrder', order: OrderType.ASC };

  protected _childrenResolve = TreeChildrenResolve.UP;

  async flatAncestorsTree(item: CategoryEntity) {
    let data: Omit<CategoryEntity, 'children'>[] = [];
    const category = await this.findAncestorsTree(item);
    const { parent } = category;
    unset(category, 'children');
    unset(category, 'parent');
    data.push(item);
    if (!isNil(parent))
      data = [...(await this.flatAncestorsTree(parent)), ...data];
    return data as CategoryEntity[];
  }
}
