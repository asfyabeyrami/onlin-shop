import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductDataAccess } from 'src/dataAccess/product.dataAccess';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductDataAccess],
})
export class ProductModule {}
