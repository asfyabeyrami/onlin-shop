import { Injectable } from '@nestjs/common';
import { BasketDataAccess } from 'src/dataAccess/basket.dataAccess';
import { OrderDataAccess } from 'src/dataAccess/order.dataAccess';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderDataAccess: OrderDataAccess,
    private readonly basketDataAccess: BasketDataAccess,
  ) {}
  async create(
    userId: number,
    basketId: number,
    addressId: number,
    delivery: string,
    paymentMethod: string,
  ) {
    const basketProducts = await this.basketDataAccess.findByBasketId(basketId);
    let totalPrice = 0;
    let totalDiscount = 0;
    const finalPrice = totalPrice + totalDiscount;
    for (const item of basketProducts) {
      totalPrice += item.product.price;
      totalDiscount += item.product.discount;
    }
    return this.orderDataAccess.createOrder(
      userId,
      basketId,
      addressId,
      delivery,
      paymentMethod,
      totalPrice,
      totalDiscount,
      finalPrice,
    );
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
