import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CommentModule } from './comment/comment.module';
import { ProductDataAccess } from 'src/dataAccess/product.dataAccess';

@Module({
  imports: [CommentModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductDataAccess],
})
export class ProductsModule {}
