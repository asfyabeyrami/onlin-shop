import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderDataAccess } from 'src/dataAccess/order.dataAccess';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrderDataAccess],
})
export class OrdersModule {}
