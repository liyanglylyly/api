import { DataSource, EventSubscriber } from 'typeorm';
import { SanitizeService } from '../services';
import { PostRepository } from '../repositories';
import { PostEntity } from '../entities';
import { PostBodyType } from '../constants';

@EventSubscriber()
export class PostSubscriber {
  constructor(
    protected dataSource: DataSource,
    protected sanitizeService: SanitizeService,
    protected postRepository: PostRepository,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return PostEntity;
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
