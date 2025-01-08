import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CommentModule } from './comment/comment.module';
import { ProductDataAccess } from 'src/dataAccess/product.dataAccess';
import { CustomCacheModule } from 'src/cache/cache.module';

@Module({
  imports: [CustomCacheModule, CommentModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductDataAccess],
})
export class ProductsModule {}
