import { Identifier, where } from 'sequelize';
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
      status: 'pending',
    });
    return result;
  }

  async updateStatus(id: number) {
    return await Models.Order.update(
      { status: 'درحال ارسال' },
      { where: { id } },
    );
  }

  async finish(id: number) {
    return await Models.Order.update(
      { status: 'ارسال شده' },
      { where: { id } },
    );
  }

  async findAllNewOrder(): Promise<Models.Order[]> {
    return await Models.Order.findAll({
      where: {
        status: 'pending',
      },
    });
  }

  async findAllDeliveri(): Promise<Models.Order[]> {
    return await Models.Order.findAll({
      where: {
        status: 'درحال ارسال',
      },
    });
  }

  async findAllFinish(): Promise<Models.Order[]> {
    return await Models.Order.findAll({
      where: {
        status: 'ارسال شده',
      },
    });
  }

  async findAll(): Promise<Models.Order[]> {
    return await Models.Order.findAll();
  }

  async findByUserId(userId: number): Promise<Models.Order[]> {
    return await Models.Order.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: Models.Basket,
          include: [
            {
              model: Models.BasketProduct,
              attributes: ['count'],
              include: [{ model: Models.Product, attributes: ['productName'] }],
            },
          ],
        },
      ],
    });
  }

  async findByOrderId(id: number): Promise<Models.Order[]> {
    return await Models.Order.findAll({
      where: {
        id,
      },
      include: [
        {
          model: Models.Basket,
          include: [
            {
              model: Models.BasketProduct,
              attributes: ['count'],
              include: [{ model: Models.Product, attributes: ['productName'] }],
            },
          ],
        },
      ],
    });
  }

  async findById(id: number) {
    return await Models.Order.findByPk(id);
  }

  async remove(id: number): Promise<void> {
    const basket = await this.findById(id);
    return await basket.destroy();
  }
}
