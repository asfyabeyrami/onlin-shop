import { Injectable } from '@nestjs/common';
import { BasketDataAccess } from 'src/dataAccess/basket.dataAccess';
import { CreateBasketDto } from 'src/DTO/basket.dto';

@Injectable()
export class BasketService {
  constructor(private readonly basketDataAccess: BasketDataAccess) {}
  async createBasket(userId: number, productId: number, count: number) {
    return await this.basketDataAccess.createBasket(userId, productId, count);
  }

  findAll() {
    return `This action returns all basket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} basket`;
  }

  // update(id: number, updateBasketDto: UpdateBasketDto) {
  //   return `This action updates a #${id} basket`;
  // }

  remove(id: number) {
    return `This action removes a #${id} basket`;
  }
}
