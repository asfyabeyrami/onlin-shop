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

  async updateBrand(
    id: number,
    brandName: string,
    picUrl: string,
    description: string,
  ) {
    return await Models.Brand.update(
      { brandName, picUrl, description },
      { where: { id } },
    );
  }

  async findAll(): Promise<Models.Brand[]> {
    return await Models.Brand.findAll();
  }

  async findById(id: number): Promise<Models.Brand> {
    return await Models.Brand.findByPk(id);
  }

  async remove(id: number): Promise<void> {
    const brand = await this.findById(id);
    return await brand.destroy();
  }
}
