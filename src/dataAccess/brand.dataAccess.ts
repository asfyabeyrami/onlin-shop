import { Identifier } from 'sequelize';
import * as Models from '../model/index';
import { HttpException } from '@nestjs/common';

export class BrandDataAccess {
  tableName() {
    return Models.Brand.tableName;
  }

  async createBrand(
    adminId: number,
    brandName: string,
    picUrl: string,
    description: string,
  ): Promise<Models.Brand> {
    const newBrand = await Models.Brand.create({
      adminId,
      brandName,
      picUrl,
      description,
    });
    return newBrand;
  }
}
