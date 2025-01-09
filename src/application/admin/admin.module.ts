import { Module } from '@nestjs/common';
import { ProvinceModule } from './province/province.module';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { OrdersModule } from './orders/orders.module';
import { AdminCommentModule } from './admin-comment/admin-comment.module';

@Module({
  imports: [
    ProvinceModule,
    BrandModule,
    CategoryModule,
    ProductModule,
    AdminCommentModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AdminModule {}
