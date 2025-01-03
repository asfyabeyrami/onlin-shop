import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { BrandDataAccess } from 'src/dataAccess/brand.dataAccess';

@Module({
  controllers: [BrandController],
  providers: [BrandService, BrandDataAccess],
})
export class BrandModule {}
