import { Identifier } from 'sequelize';
import * as Models from '../model/index';
import { HttpException } from '@nestjs/common';
import { count } from 'console';

export class ProductDataAccess {
  tableName() {
    return Models.Product.tableName;
  }

  async createProduct(
    adminId: number,
    brandId: number,
    categoryId: number,
    productName: string,
    pCode: number,
    count: number,
    price: number,
    discount: string,
    picUrl: string,
    description: string,
  ): Promise<Models.Product> {
    const product = await Models.Product.create({
      adminId,
      brandId,
      categoryId,
      productName,
      pCode,
      isAvailable: true,
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
}
