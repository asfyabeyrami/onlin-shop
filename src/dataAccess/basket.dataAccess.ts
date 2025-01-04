import { Identifier } from 'sequelize';
import * as Models from '../model/index';
import { HttpException } from '@nestjs/common';

export class BasketDataAccess {
  tableName() {
    return Models.Basket.tableName;
  }

  async createBasket(
    userId: number,
    productId: number,
    count: number,
  ): Promise<Models.Basket> {
    const newBasket = await Models.Basket.create({
      userId,
    });
    await Models.BasketProduct.create({
      productId: productId,
      basketId: newBasket.id,
      count,
    });

    return newBasket;
  }
}
