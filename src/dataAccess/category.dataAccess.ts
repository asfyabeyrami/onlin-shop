import { Identifier, where } from 'sequelize';
import * as Models from '../model/index';
import { HttpException } from '@nestjs/common';

export class CatDataAccess {
  tableName() {
    return Models.Category.tableName;
  }

  async createCategory(
    adminId: number,
    title: string,
    fatherId: number,
  ): Promise<Models.Category> {
    const category = await Models.Category.create({
      adminId,
      title,
      fatherId,
    });
    return category;
  }

  async updateCategory(
    id: number,
    adminId: number,
    fatherId: number,
    title: string,
  ) {
    return await Models.Category.update(
      { adminId, fatherId, title },
      { where: { id } },
    );
  }

  async findAllAsCat(title: string): Promise<Models.Category[]> {
    const products = await Models.Category.findAll({
      where: {
        title: title,
      },
      include: [
        {
          model: Models.Product,
          attributes: ['productName', 'price', 'discount'],
        },
      ],
    });

    return products;
  }

  async findAll(): Promise<Models.Category[]> {
    return await Models.Category.findAll();
  }

  async findById(id: number): Promise<Models.Category> {
    return await Models.Category.findByPk(id);
  }

  async findOne(id: number): Promise<Models.Category> {
    return await Models.Category.findOne({
      where: { id },
      include: [
        {
          model: Models.Category,
          as: 'parent',
          attributes: ['id', 'title', 'fatherId'],
        },
      ],
    });
  }
  async remove(id: number): Promise<void> {
    const Category = await this.findById(id);
    return await Category.destroy();
  }
}
