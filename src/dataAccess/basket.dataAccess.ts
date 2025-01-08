import { Identifier } from 'sequelize';
import * as Models from '../model/index';
import { HttpException } from '@nestjs/common';

export class BasketDataAccess {
  tableName() {
    return Models.Basket.tableName;
  }

  async createBasket(
    userId: number,
    productId: number,
    count: number,
  ): Promise<Models.Basket> {
    const newBasket = await Models.Basket.create({
      userId,
    });
    await Models.BasketProduct.create({
      productId: productId,
      basketId: newBasket.id,
      count,
    });

    return newBasket;
  }

  async findById(basketId: number) {
    return await Models.BasketProduct.findOne({
      where: { basketId },
      attributes: ['count'],
    });
  }

  async findProduct(productId: number) {
    await Models.Product.findAll({
      where: {
        id: productId,
      },
      attributes: ['id', 'productName', 'price'],
    });
  }

  async findBasketByUserId(userId: number): Promise<Models.Basket[]> {
    const baskets = await Models.Basket.findAll({
      where: { userId },
      include: [
        {
          model: Models.BasketProduct,
          attributes: ['productId', 'count'],
          include: [{ model: Models.Product }],
        },
      ],
    });
    return baskets;
  }

  async findAllBasketByUserId(userId: number) {
    const basket = await Models.Basket.findAll({
      where: { userId },
      include: [
        {
          model: Models.BasketProduct,
          attributes: ['productId', 'count'],
          include: [
            { model: Models.Product, attributes: ['productName', 'price'] },
          ],
        },
      ],
    });
    return basket;
  }

  async findByBasketId(basketId: number): Promise<Models.BasketProduct[]> {
    return await Models.BasketProduct.findAll({
      where: {
        basketId,
      },
      include: [
        {
          model: Models.Product,
          attributes: ['id', 'productName', 'price', 'count', 'discount'],
        },
      ],
    });
  }
  async findPrice(basketId: number) {
    const result = await Models.BasketProduct.findOne({
      where: {
        basketId: basketId,
      },
    });
    return result;
  }

  async findByIdForDelete(id: number) {
    return await Models.Basket.findByPk(id);
  }

  async mergeBaskets(userId: number): Promise<Models.Basket> {
    // 1. پیدا کردن همه سبدهای کاربر
    const existingBaskets = await this.findBasketByUserId(userId);

    if (!existingBaskets.length) {
      throw new HttpException('هیچ سبد خریدی یافت نشد', 404);
    }

    // 2. ایجاد سبد جدید
    const newBasket = await Models.Basket.create({ userId });

    // 3. ادغام محصولات
    const productMap = new Map<number, number>();

    for (const basket of existingBaskets) {
      const basketProducts = await this.findByBasketId(basket.id);

      for (const bp of basketProducts) {
        const currentCount = productMap.get(bp.product.id) || 0;
        productMap.set(bp.product.id, currentCount + bp.count);
      }

      // حذف BasketProduct های مربوط به سبد قدیمی
      await this.removeBasketProducts(basket.id);
      // حذف سبد قدیمی
      await this.remove(basket.id);
    }

    // 4. اضافه کردن محصولات به سبد جدید
    for (const [productId, count] of productMap) {
      await Models.BasketProduct.create({
        basketId: newBasket.id,
        productId,
        count,
      });
    }

    return newBasket;
  }

  async removeBasketProducts(basketId: number): Promise<void> {
    await Models.BasketProduct.destroy({
      where: { basketId },
    });
  }

  async remove(id: number): Promise<void> {
    const basket = await this.findByIdForDelete(id);
    return await basket.destroy();
  }
}
