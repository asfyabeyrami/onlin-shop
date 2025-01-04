import { Identifier } from 'sequelize';
import * as Models from '../model/index';
import { HttpException } from '@nestjs/common';

export class AddressDataAccess {
  tableName() {
    return Models.Address.tableName;
  }

  async createAddress(
    userId: number,
    cityId: number,
    address: string,
    zipCode: number,
  ): Promise<Models.Address> {
    const result = await Models.Address.create({
      userId,
      cityId,
      address,
      zipCode,
    });
    return result;
  }
}
