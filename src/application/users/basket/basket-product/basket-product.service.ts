import { Injectable } from '@nestjs/common';

@Injectable()
export class BasketProductService {
  // create(createBasketProductDto: CreateBasketProductDto) {
  //   return 'This action adds a new basketProduct';
  // }

  findAll() {
    return `This action returns all basketProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} basketProduct`;
  }

  // update(id: number, updateBasketProductDto: UpdateBasketProductDto) {
  //   return `This action updates a #${id} basketProduct`;
  // }

  remove(id: number) {
    return `This action removes a #${id} basketProduct`;
  }
}
