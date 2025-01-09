import { Identifier } from 'sequelize';
import * as Models from '../model/index';
import { HttpException } from '@nestjs/common';
import { count } from 'console';

export class ProductDataAccess {
  tableName() {
    return Models.Product.tableName;
  }
  async findById(id: number): Promise<Models.Product> {
    return await Models.Product.findByPk(id);
  }

  async findByForUser(id: number): Promise<Models.Product> {
    return await Models.Product.findOne({
      where: { id },
      include: [
        {
          model: Models.Comment,
          required: false,
          separate: true,
          where: { isPublish: true },
          attributes: ['comment'],
          include: [
            {
              model: Models.User,
              attributes: ['name'],
            },
          ],
        },
      ],
    });
  }
  async createProduct(
    adminId: number,
    brandId: number,
    categoryId: number,
    productName: string,
    pCode: number,
    isAvailable: boolean,
    count: number,
    price: number,
    discount: number,
    picUrl: string,
    description: string,
  ): Promise<Models.Product> {
    const product = await Models.Product.create({
      adminId,
      brandId,
      categoryId,
      productName,
      pCode,
      isAvailable,
      count,
      price,
      discount,
      picUrl,
      description,
    });
    return product;
  }

  async findByName(productName: string): Promise<Models.Product> {
    const product = await Models.Product.findOne({
      where: {
        productName,
      },
    });
    return product;
  }

  async notAvailable(productName: string) {
    const product = await this.findByName(productName);
    await product.update({
      isAvailable: false,
      count: 0,
    });
    return product;
  }

  async updateProduct(
    id: number,
    adminId: number,
    brandId: number,
    categoryId: number,
    productName: string,
    pCode: number,
    count: number,
    price: number,
    discount: number,
    picUrl: string,
    description: string,
  ) {
    return await Models.Product.update(
      {
        adminId,
        brandId,
        categoryId,
        productName,
        pCode,
        count,
        price,
        discount,
        picUrl,
        description,
      },
      { where: { id } },
    );
  }

  async findAllForUser(): Promise<Models.Product[]> {
    return await Models.Product.findAll({ where: { isAvailable: true } });
  }

  async findAll(): Promise<Models.Product[]> {
    return await Models.Product.findAll();
  }

  async findAllAsCat(categoryName: string): Promise<Models.Product[]> {
    const products = await Models.Product.findAll({
      include: [
        {
          model: Models.Category,
          where: {
            title: categoryName,
          },
        },
      ],
    });

    return products;
  }

  async remove(id: number): Promise<void> {
    const Product = await this.findById(id);
    return await Product.destroy();
  }
}
