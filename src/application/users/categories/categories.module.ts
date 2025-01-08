import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CatDataAccess } from 'src/dataAccess/category.dataAccess';
import { CustomCacheModule } from 'src/cache/cache.module';

@Module({
  imports: [CustomCacheModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, CatDataAccess],
})
export class CategoriesModule {}
