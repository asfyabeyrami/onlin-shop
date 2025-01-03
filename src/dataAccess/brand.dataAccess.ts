import { Identifier } from 'sequelize';
import * as Models from '../model/index';
import { HttpException } from '@nestjs/common';

export class BrandDataAccess {
  tableName() {
    return Models.Brand.tableName;
  }

  async createBrand(
    adminId: number,
    categoryId: number,
    brandName: string,
    picUrl: string,
    description: string,
  ): Promise<Models.Brand> {
    const brand = await Models.Brand.create({
      adminId,
      categoryId,
      brandName,
      picUrl,
      description,
    });
    return brand;
  }
}
