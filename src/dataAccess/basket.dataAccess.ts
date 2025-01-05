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

  async findById(basketId: number) {
    return await Models.BasketProduct.findOne({
      where: { basketId },
      attributes: ['count'],
    });
  }

  async findProduct(productId: number) {
    await Models.Product.findAll({
      where: {
        id: productId,
      },
      attributes: ['id', 'productName', 'price'],
    });
  }

  async findBasketByUserId(userId: number) {
    const basket = await Models.Basket.findAll({
      where: { userId },
      include: [
        {
          model: Models.BasketProduct,
          attributes: ['productId'],
          include: [{ model: Models.Product, attributes: ['productName'] }],
        },
      ],
    });
    return basket;
  }

  async findByBasketId(basketId: number): Promise<Models.BasketProduct[]> {
    return await Models.BasketProduct.findAll({
      where: {
        basketId,
      },
      include: [
        {
          model: Models.Product,
          attributes: ['id', 'productName', 'price', 'count', 'discount'],
        },
      ],
    });
  }
  async findPrice(basketId: number) {
    const result = await Models.BasketProduct.findOne({
      where: {
        basketId: basketId,
      },
    });
    return result;
  }
}
