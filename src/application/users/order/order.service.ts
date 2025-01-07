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
    basketId: number,
    addressId: number,
    delivery: string,
    paymentMethod: string,
  ) {
    const basketProducts = await this.basketDataAccess.findByBasketId(basketId);

    let finalPrice = 0;
    let totalPrice = 0;
    let totalDiscount = 0;

    basketProducts.forEach((basketProduct) => {
      let price = basketProduct.product.price;
      const discount = basketProduct.product.discount;
      const count = basketProduct.product.count;

      totalPrice += price * count;

      const productDiscount = price * (discount / 100);
      totalDiscount += productDiscount * count;

      const discountedPrice = price - productDiscount;
      finalPrice += discountedPrice * count;
    });

    return this.orderDataAccess.createOrder(
      userId,
      basketId,
      addressId,
      delivery,
      paymentMethod,
      totalPrice,
      totalDiscount,
      finalPrice,
    );
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
