import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { ProvinceDataAccess } from 'src/dataAccess/province.dataAccess';

@Module({
  controllers: [CityController],
  providers: [CityService, ProvinceDataAccess],
})
export class CityModule {}
