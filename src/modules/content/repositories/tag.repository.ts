import { PostEntity, TagEntity } from '@/modules/content/entities';
import { CustomRepository } from '@/modules/database/decorators/repository.decorator';
import { BaseRepository } from '@/modules/database/base';

@CustomRepository(TagEntity)
export class TagRepository extends BaseRepository<TagEntity> {
  protected _qbName = 'tag';
  buildBaseQB() {
    return this.createQueryBuilder(this.qbName)
      .leftJoinAndSelect(`${this.qbName}.posts`, 'posts')
      .addSelect(
        (subQuery) =>
          subQuery.select('COUNT(p.id)', 'count').from(PostEntity, 'p'),
        'postCount',
      )
      .orderBy('postCount', 'DESC')
      .loadRelationCountAndMap(
        `${this.qbName}.postCount`,
        `${this.qbName}.posts`,
      );
  }
}
