import { Injectable } from '@nestjs/common';

@Injectable()
export class BasketService {
  // create(createBasketDto: CreateBasketDto) {
  //   return 'This action adds a new basket';
  // }

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
