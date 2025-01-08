import { Injectable, Logger } from '@nestjs/common';
import { ProductDataAccess } from 'src/dataAccess/product.dataAccess';
import { UpdateProductDto } from 'src/DTO/product.dto';

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
    discount: number,
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

  async findAll() {
    return await this.productDataAccess.findAll();
  }
  async findAllAsCat(category: string) {
    const catProduct = await this.productDataAccess.findAllAsCat(category);
    return catProduct;
  }

  async findOne(id: number) {
    return await this.productDataAccess.findById(id);
  }

  async findWithName(productName: string) {
    return await this.productDataAccess.findByName(productName);
  }

  async update(
    id: number,
    adminId: number,
    updateProductDto: UpdateProductDto,
  ) {
    const {
      brandId,
      categoryId,
      productName,
      pCode,
      count,
      price,
      discount,
      picUrl,
      description,
    } = updateProductDto;
    try {
      await this.productDataAccess.updateProduct(
        id,
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
      return 'product updated';
    } catch (error) {
      throw new Logger(error);
    }
  }

  async remove(id: number) {
    return await this.productDataAccess.remove(id);
  }
}
