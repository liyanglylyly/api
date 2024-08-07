import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PostService, SanitizeService } from '@/modules/content/services';
import { PostSubscriber } from '@/modules/content/subscribers';
import { PostRepository } from '@/modules/content/repositories';
import { PostEntity } from '@/modules/content/entities';
import { PostController } from '@/modules/content/controllers';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    DatabaseModule.forRepository([PostRepository]),
  ],
  controllers: [PostController],
  providers: [PostService, SanitizeService, PostSubscriber],
  exports: [PostService, DatabaseModule.forRepository([PostRepository])],
})
export class ContentModule {}
