import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { PostEntity } from '@/modules/content/entities';
import { Exclude, Expose } from 'class-transformer';
import type { Relation } from 'typeorm';
@Entity('content_tags')
@Exclude()
export class TagEntity {
  @Expose()
  @PrimaryColumn({ type: 'varchar', generated: 'uuid', length: 36 })
  id: string;

  @Expose()
  @Column({ comment: '标签名称', unique: true })
  name: string;

  @Expose()
  @Column({ comment: '标签描述', nullable: true })
  description?: string;

  @Expose()
  postCount: number;

  @ManyToMany(() => PostEntity, (post) => post.tags)
  posts: Relation<PostEntity[]>;
}
