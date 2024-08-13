import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { CategoryStatus } from '@/modules/content/constants';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Column({ comment: '名称' })
  name: string;

  @Column({ comment: '描述' })
  description: string;

  @Column({ comment: '图片' })
  img: string;

  @Column({
    comment: '是否在线',
    type: 'enum',
    enum: CategoryStatus,
    default: CategoryStatus.ONLINE,
  })
  online: CategoryStatus;

  @Column({ comment: '排序' })
  index: number;

  @ManyToOne(() => CategoryEntity, (category) => category.children, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  parent: Relation<CategoryEntity> | null;

  @OneToMany(() => CategoryEntity, (category) => category.parent, {
    cascade: true,
  })
  children: Relation<CategoryEntity>[];
}
