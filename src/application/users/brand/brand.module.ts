import { Module } from '@nestjs/common';
import { BrandsService } from './brand.service';
import { BrandsController } from './brand.controller';
import { BrandDataAccess } from 'src/dataAccess/brand.dataAccess';
import { CustomCacheModule } from 'src/cache/cache.module';

@Module({
  imports: [CustomCacheModule],
  controllers: [BrandsController],
  providers: [BrandsService, BrandDataAccess],
})
export class BrandsModule {}
