import { BaseSubscriber } from '@/modules/database/base/subcriber';
import { DataSource, EventSubscriber } from 'typeorm';
import { PostEntity } from '@/modules/content/entities';
import { PostRepository } from '@/modules/content/repositories';
import { SanitizeService } from '@/modules/content/services/sanitize.service';
import { Optional } from '@nestjs/common';
import { PostBodyType } from '@/modules/content/constants';

/**
 * 文章模型观察者
 */
@EventSubscriber()
export class PostSubscriber extends BaseSubscriber<PostEntity> {
  protected entity = PostEntity;

  constructor(
    protected dataSource: DataSource,
    protected postRepository: PostRepository,
    @Optional() protected sanitizeService?: SanitizeService,
  ) {
    super(dataSource);
  }

  /**
   * 加载文章数据的处理
   * @param entity
   */
  async afterLoad(entity: PostEntity) {
    if (entity.type === PostBodyType.HTML) {
      entity.body = this.sanitizeService.sanitize(entity.body);
    }
  }
}
