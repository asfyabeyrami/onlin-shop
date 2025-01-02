import { Module } from '@nestjs/common';
import { BasketProductService } from './basket-product.service';
import { BasketProductController } from './basket-product.controller';

@Module({
  controllers: [BasketProductController],
  providers: [BasketProductService],
})
export class BasketProductModule {}
