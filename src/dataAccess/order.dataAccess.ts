import { Identifier } from 'sequelize';
import * as Models from '../model/index';
import { HttpException } from '@nestjs/common';

export class OrderDataAccess {
  tableName() {
    return Models.Order.tableName;
  }

  async createOrder(): Promise<Models.Order> {
    const result = await Models.Order.create({});
    return result;
  }
}
