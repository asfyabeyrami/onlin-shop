import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminDataAccess } from 'src/dataAccess/admin.dataAccess';
import { ProvinceModule } from './province/province.module';
import { CityModule } from './city/city.module';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ProvinceModule,
    CityModule,
    BrandModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminDataAccess],
})
export class AdminModule {}
