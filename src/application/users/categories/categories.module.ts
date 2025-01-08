import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CatDataAccess } from 'src/dataAccess/category.dataAccess';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CatDataAccess],
})
export class CategoriesModule {}
