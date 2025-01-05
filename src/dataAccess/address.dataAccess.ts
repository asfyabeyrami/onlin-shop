import { Identifier, where } from 'sequelize';
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

  async updateAddress(
    userId: number,
    cityId: number,
    address: string,
    zipCode: number,
  ) {
    return await Models.Address.update(
      { cityId, address, zipCode },
      { where: { userId } },
    );
  }

  async findByPk(id: number) {
    return await Models.Address.findByPk(id);
  }

  async findAll(userId: number): Promise<Models.Address[]> {
    return await Models.Address.findAll({
      where: { userId },
    });
  }

  async remove(id: number) {
    const address = await this.findByPk(id);
    return address.destroy();
  }
}
