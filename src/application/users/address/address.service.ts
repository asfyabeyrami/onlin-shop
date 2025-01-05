import { Injectable } from '@nestjs/common';
import { AddressDataAccess } from 'src/dataAccess/address.dataAccess';

@Injectable()
export class AddressService {
  constructor(private readonly addressDataAccess: AddressDataAccess) {}
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

  async findAll(userId: number) {
    return await this.addressDataAccess.findAll(userId);
  }

  async remove(id: number) {
    return await this.addressDataAccess.remove(id);
  }
}
