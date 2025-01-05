import { Identifier } from 'sequelize';
import * as Models from '../model/index';
import { HttpException } from '@nestjs/common';

export class OrderDataAccess {
  tableName() {
    return Models.Order.tableName;
  }

  async createOrder(
    userId: number,
    basketId: number,
    addressId: number,
    delivery: string,
    paymentMethod: string,
    totalPrice: number,
    totalDiscount: number,
    finalPrice: number,
  ): Promise<Models.Order> {
    const result = await Models.Order.create({
      userId,
      basketId,
      addressId,
      delivery,
      paymentMethod,
      totalPrice,
      totalDiscount,
      finalPrice,
    });
    return result;
  }

  async findAll(): Promise<Models.Order[]> {
    return await Models.Order.findAll();
  }

  async findByUserId(userId: number): Promise<Models.Order[]> {
    return await Models.Order.findAll({
      where: {
        userId,
      },
    });
  }
}
