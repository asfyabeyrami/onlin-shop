import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AddressDataAccess } from 'src/dataAccess/address.dataAccess';
import { ProvinceDataAccess } from 'src/dataAccess/province.dataAccess';

@Module({
  controllers: [AddressController],
  providers: [AddressService, AddressDataAccess, ProvinceDataAccess],
})
export class AddressModule {}
