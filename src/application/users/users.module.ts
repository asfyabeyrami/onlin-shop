import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserDataAccess } from 'src/dataAccess/users.dataAccess';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/model';
import { BasketModule } from './basket/basket.module';
import { OrderModule } from './order/order.module';
import { AddressModule } from './address/address.module';
import { BasketService } from './basket/basket.service';
import { BasketDataAccess } from 'src/dataAccess/basket.dataAccess';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    BasketModule,
    OrderModule,
    AddressModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UserDataAccess, BasketService, BasketDataAccess],
})
export class UsersModule {}
