import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './application/users/users.module';
import { AdminModule } from './application/admin/admin.module';
import { CategoryModule } from './application/admin/category/category.module';
import { OrderModule } from './application/users/order/order.module';
import { AddressModule } from './application/users/order/address/address.module';
import { BasketModule } from './application/users/basket/basket.module';
import { ProductModule } from './application/admin/product/product.module';
import sequilzeObj from './database/sequilze.obj';
import {
  Address,
  Admin,
  Basket,
  BasketProduct,
  Brand,
  CatBrand,
  Category,
  City,
  Order,
  Product,
  Province,
  User,
} from './model';
import { AuthModule } from './application/auth/auth.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'asfya',
      password: '0521675413',
      database: 'shop',
      models: [
        User,
        Admin,
        Address,
        City,
        Province,
        Category,
        Brand,
        Product,
        Basket,
        Order,
        BasketProduct,
        CatBrand,
      ],
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    AdminModule,
    // CategoryModule,
    // OrderModule,
    // AddressModule,
    // BasketModule,
    // ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
