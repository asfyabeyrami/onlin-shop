import { Module } from '@nestjs/common';
import { UserDataAccess } from 'src/dataAccess/users.dataAccess';
import { BasketModule } from './basket/basket.module';
import { OrderModule } from './order/order.module';
import { AddressModule } from './address/address.module';
import { BasketService } from './basket/basket.service';
import { BasketDataAccess } from 'src/dataAccess/basket.dataAccess';
import { AddressService } from './address/address.service';
import { AddressDataAccess } from 'src/dataAccess/address.dataAccess';
import { OrderService } from './order/order.service';
import { OrderDataAccess } from 'src/dataAccess/order.dataAccess';
import { ProvinceDataAccess } from 'src/dataAccess/province.dataAccess';
import { BrandsModule } from './brand/brand.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [BasketModule, OrderModule, AddressModule, BrandsModule, ProductsModule, CategoriesModule],
  controllers: [],
  providers: [
    UserDataAccess,
    BasketService,
    BasketDataAccess,
    AddressService,
    AddressDataAccess,
    ProvinceDataAccess,
    OrderService,
    OrderDataAccess,
  ],
})
export class UsersModule {}
