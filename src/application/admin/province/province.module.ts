import { Module } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ProvinceController } from './province.controller';
import { CityModule } from './city/city.module';
import { ProductDataAccess } from 'src/dataAccess/product.dataAccess';
import { ProvinceDataAccess } from 'src/dataAccess/province.dataAccess';
import { AdminDataAccess } from 'src/dataAccess/admin.dataAccess';

@Module({
  imports: [CityModule],
  controllers: [ProvinceController],
  providers: [ProvinceService, ProvinceDataAccess, AdminDataAccess],
})
export class ProvinceModule {}
