import { Injectable } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
import { ProductDataAccess } from 'src/dataAccess/product.dataAccess';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productDataAccess: ProductDataAccess,
    private readonly cacheService: CacheService,
  ) {}
  async findAll() {
    //finding as cache
    const cachedProducts = await this.cacheService.get('all_products');
    if (cachedProducts) {
      return cachedProducts;
    }

    // find database
    const products = await this.productDataAccess.findAll();

    // save in cache
    await this.cacheService.set('all_products', products, 3600);
    return products;
  }

  async findOne(id: number) {
    const cacheKey = `product_${id}`;
    //finding as cache
    const cachedProduct = await this.cacheService.get(cacheKey);
    if (cachedProduct) {
      return cachedProduct;
    }

    //finding as database if cache not found
    const product = await this.productDataAccess.findByForUser(id);

    // save in cache
    await this.cacheService.set(cacheKey, product, 3600);

    return product;
  }
}
