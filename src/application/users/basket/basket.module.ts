import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { BasketProductModule } from './basket-product/basket-product.module';

@Module({
  controllers: [BasketController],
  providers: [BasketService],
  imports: [BasketProductModule],
})
export class BasketModule {}
