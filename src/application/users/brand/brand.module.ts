import { Module } from '@nestjs/common';
import { BrandsService } from './brand.service';
import { BrandsController } from './brand.controller';
import { BrandDataAccess } from 'src/dataAccess/brand.dataAccess';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService, BrandDataAccess],
})
export class BrandsModule {}
