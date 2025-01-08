import { Injectable } from '@nestjs/common';
import { OrderDataAccess } from 'src/dataAccess/order.dataAccess';

@Injectable()
export class OrdersService {
  constructor(private readonly orderDataAccess: OrderDataAccess) {}
  async findAll() {
    return await this.orderDataAccess.findAll();
  }

  async findAllNewOrder() {
    return await this.orderDataAccess.findAllNewOrder();
  }

  async findAllDeliveri() {
    return await this.orderDataAccess.findAllDeliveri();
  }

  async findAllFinish() {
    return await this.orderDataAccess.findAllFinish();
  }

  async findOne(id: number) {
    return await this.orderDataAccess.findByOrderId(id);
  }

  async update(id: number) {
    return await this.orderDataAccess.updateStatus(id);
  }

  async finish(id: number) {
    return await this.orderDataAccess.finish(id);
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
