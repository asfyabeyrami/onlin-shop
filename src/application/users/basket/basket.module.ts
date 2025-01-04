import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { BasketProductModule } from './basket-product/basket-product.module';
import { BasketDataAccess } from 'src/dataAccess/basket.dataAccess';

@Module({
  imports: [BasketProductModule],
  controllers: [BasketController],
  providers: [BasketService, BasketDataAccess],
})
export class BasketModule {}
