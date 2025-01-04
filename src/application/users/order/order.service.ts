import { Injectable } from '@nestjs/common';
import { BasketDataAccess } from 'src/dataAccess/basket.dataAccess';
import { OrderDataAccess } from 'src/dataAccess/order.dataAccess';

@Injectable()
export class OrderService {
  constructor(private readonly orderDataAccess: OrderDataAccess) {}
  create(
    userId: number,
    basketId: number,
    addressId: number,
    delivery: string,
    paymentMethod: string,
  ) {
    return this.orderDataAccess.createOrder();
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
