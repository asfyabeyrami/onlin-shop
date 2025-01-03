import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CatDataAccess } from 'src/dataAccess/category.dataAccess';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CatDataAccess],
})
export class CategoryModule {}
