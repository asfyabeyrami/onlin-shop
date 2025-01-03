import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AddressModule } from '../address/address.module';

@Module({
  imports: [AddressModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
