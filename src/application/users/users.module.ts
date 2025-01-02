import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserDataAccess } from 'src/dataAccess/users.dataAccess';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/model';
import { BasketModule } from './basket/basket.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), BasketModule, OrderModule],
  controllers: [UsersController],
  providers: [UsersService, UserDataAccess],
})
export class UsersModule {}
