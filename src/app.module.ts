import { Module } from '@nestjs/common';
import { CoreModule } from './modules/core/core.module';
import { DatabaseModule } from './modules/database/database.module';
import { ContentModule } from './modules/content/content.module';
import { database } from './config/database.config';

@Module({
  imports: [
    CoreModule.forRoot(),
    DatabaseModule.forRoot(database),
    ContentModule,
  ],
  providers: [],
})
export class AppModule {}
