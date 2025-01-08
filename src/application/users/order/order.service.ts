import { Injectable } from '@nestjs/common';
import { BasketDataAccess } from 'src/dataAccess/basket.dataAccess';
import { OrderDataAccess } from 'src/dataAccess/order.dataAccess';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderDataAccess: OrderDataAccess,
    private readonly basketDataAccess: BasketDataAccess,
  ) {}
  async create(
    userId: number,
    addressId: number,
    delivery: string,
    paymentMethod: string,
  ) {
    // 1. ادغام همه سبدهای خرید
    const mergedBasket = await this.basketDataAccess.mergeBaskets(userId);

    // 2. دریافت محصولات سبد ادغام شده
    const basketProducts = await this.basketDataAccess.findByBasketId(
      mergedBasket.id,
    );

    let finalPrice = 0;
    let totalPrice = 0;
    let totalDiscount = 0;

    // 3. محاسبه قیمت‌ها
    basketProducts.forEach((basketProduct) => {
      let price = basketProduct.product.price;
      const discount = basketProduct.product.discount;
      const count = basketProduct.count;

      totalPrice += price * count;
      const productDiscount = price * (discount / 100);
      totalDiscount += productDiscount * count;
      const discountedPrice = price - productDiscount;
      finalPrice += discountedPrice * count;
    });

    // 4. ایجاد سفارش
    const order = await this.orderDataAccess.createOrder(
      userId,
      mergedBasket.id,
      addressId,
      delivery,
      paymentMethod,
      totalPrice,
      totalDiscount,
      finalPrice,
    );

    // 5. پاکسازی سبد خرید و محصولات آن بعد از ایجاد سفارش
    // await this.basketDataAccess.removeBasketProducts(mergedBasket.id);
    // await this.basketDataAccess.remove(mergedBasket.id);

    return order;
  }

  async findAll() {
    const orders = await this.orderDataAccess.findAll();
    return orders;
  }

  async findOne(id: number) {
    return await this.orderDataAccess.findByUserId(id);
  }

  async remove(id: number) {
    return await this.orderDataAccess.remove(id);
  }
}
