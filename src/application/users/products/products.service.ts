import { Injectable } from '@nestjs/common';
import { ProductDataAccess } from 'src/dataAccess/product.dataAccess';

@Injectable()
export class ProductsService {
  constructor(private readonly productDataAccess: ProductDataAccess) {}
  async findAll() {
    return await this.productDataAccess.findAll();
  }

  async findOne(id: number) {
    return await this.productDataAccess.findByForUser(id);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
