import { Injectable } from '@nestjs/common';
import { ProductDataAccess } from 'src/dataAccess/product.dataAccess';

@Injectable()
export class ProductService {
  constructor(private readonly productDataAccess: ProductDataAccess) {}
  async create(
    adminId: number,
    brandId: number,
    categoryId: number,
    productName: string,
    pCode: number,
    count: number,
    price: number,
    discount: string,
    picUrl: string,
    description: string,
  ) {
    return await this.productDataAccess.createProduct(
      adminId,
      brandId,
      categoryId,
      productName,
      pCode,
      count,
      price,
      discount,
      picUrl,
      description,
    );
  }

  async notAvailable(productName: string) {
    return this.productDataAccess.notAvailable(productName);
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
