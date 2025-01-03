import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './application/users/users.module';
import { AdminModule } from './application/admin/admin.module';

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
    AdminModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
