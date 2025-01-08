import { Injectable } from '@nestjs/common';
import { AddressDataAccess } from 'src/dataAccess/address.dataAccess';
import { ProvinceDataAccess } from 'src/dataAccess/province.dataAccess';

@Injectable()
export class AddressService {
  constructor(
    private readonly addressDataAccess: AddressDataAccess,
    private readonly ProvinceDataAccess: ProvinceDataAccess,
  ) {}
  async create(
    userId: number,
    cityId: number,
    address: string,
    zipCode: number,
  ) {
    return await this.addressDataAccess.createAddress(
      userId,
      cityId,
      address,
      zipCode,
    );
  }

  async updateAddress(
    userId: number,
    cityId: number,
    address: string,
    zipCode: number,
  ): Promise<boolean> {
    await this.addressDataAccess.updateAddress(
      userId,
      cityId,
      address,
      zipCode,
    );
    return true;
  }

  async findAllCity(province: string) {
    return await this.ProvinceDataAccess.findAllCity(province);
  }

  async findAllProvince() {
    return await this.ProvinceDataAccess.findAllProvince();
  }

  async findAll(userId: number) {
    return await this.addressDataAccess.findAll(userId);
  }

  async remove(id: number) {
    return await this.addressDataAccess.remove(id);
  }
}
