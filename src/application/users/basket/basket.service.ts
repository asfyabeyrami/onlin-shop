import { HttpException, Injectable } from '@nestjs/common';
import { BasketDataAccess } from 'src/dataAccess/basket.dataAccess';
import { ProductDataAccess } from 'src/dataAccess/product.dataAccess';
import { CreateBasketDto } from 'src/DTO/basket.dto';

@Injectable()
export class BasketService {
  constructor(private readonly basketDataAccess: BasketDataAccess) {}

  async createBasket(userId: number, productId: number, count: number) {
    const isAvailable = await this.basketDataAccess.checkAvailable(productId);
    if (!isAvailable) {
      throw new HttpException('موجود نیست', 403);
    }
    return await this.basketDataAccess.createBasket(userId, productId, count);
  }

  async findBasketByUserId(id: number) {
    // دریافت تمام سبدهای کاربر
    const baskets = await this.basketDataAccess.findAllBasketByUserId(id);

    if (!baskets.length) {
      throw new Error('هیچ سبد خریدی برای این کاربر یافت نشد');
    }

    // استخراج آیدی محصولات از تمام سبدها
    const productIds = baskets.flatMap((basket) =>
      basket.BasketProduct.map((basketProduct) => basketProduct.productId),
    );

    // به نظر می‌رسد این خط اشتباه است چون دوباره همان متد را صدا می‌زند
    // const products = await this.basketDataAccess.findBasketByUserId(id);

    return baskets; // مستقیماً سبدها را برمی‌گردانیم
  }
  // update(id: number, updateBasketDto: UpdateBasketDto) {
  //   return `This action updates a #${id} basket`;
  // }

  async remove(id: number) {
    return await this.basketDataAccess.remove(id);
  }
}
