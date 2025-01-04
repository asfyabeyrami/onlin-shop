import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AddressModule } from '../address/address.module';
import { OrderDataAccess } from 'src/dataAccess/order.dataAccess';
import { BasketDataAccess } from 'src/dataAccess/basket.dataAccess';

@Module({
  imports: [AddressModule],
  controllers: [OrderController],
  providers: [OrderService, OrderDataAccess],
})
export class OrderModule {}
