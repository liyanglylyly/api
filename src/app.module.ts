import { Module } from '@nestjs/common';
import { CoreModule } from './modules/core/core.module';
import { DatabaseModule } from './modules/database/database.module';
import { ContentModule } from './modules/content/content.module';
import { database } from './config/database.config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppPipe } from '@/modules/core/providers/app.pipe';
import { AppInterceptor } from '@/modules/core/providers';
import { AppFilter } from '@/modules/core/providers/app.filter';
import { CategoryModule } from '@/modules/category/category.module';

@Module({
  imports: [
    CoreModule.forRoot(),
    DatabaseModule.forRoot(database),
    ContentModule,
    CategoryModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new AppPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        validationError: { target: false },
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AppInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AppFilter,
    },
  ],
})
export class AppModule {}
