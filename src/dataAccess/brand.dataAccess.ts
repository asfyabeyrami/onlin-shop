import { Identifier } from 'sequelize';
import * as Models from '../model/index';
import { HttpException } from '@nestjs/common';
import { UpdatedAt } from 'sequelize-typescript';

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
    adminId: number,
    brandName: string,
    picUrl: string,
    description: string,
  ) {
    return await Models.Brand.update(
      { adminId, brandName, picUrl, description, UpdatedAt },
      { where: { id } },
    );
  }

  async findAllbrand(brandName: string) {
    const product = await Models.Brand.findAll({
      where: {
        brandName: brandName,
      },
      include: [
        {
          model: Models.Product,
          attributes: ['productName'],
        },
      ],
    });

    return product;
  }

  async findAll(): Promise<Models.Brand[]> {
    return await Models.Brand.findAll();
  }

  async findByName(brandName: string): Promise<Models.Brand> {
    return await Models.Brand.findOne({ where: { brandName } });
  }

  async findById(id: number): Promise<Models.Brand> {
    return await Models.Brand.findByPk(id);
  }

  async remove(id: number): Promise<void> {
    const brand = await this.findById(id);
    return await brand.destroy();
  }
}
