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
    fatherId: number,
    picUrl: string,
    description: string,
  ): Promise<Models.Brand> {
    const newBrand = await Models.Brand.create({
      adminId,
      categoryId,
      brandName,
      fatherId,
      picUrl,
      description,
    });
    await Models.CatBrand.create({
      categoryId: categoryId,
      brandId: newBrand.id,
    });

    return newBrand;
  }
}
