import { Module } from '@nestjs/common';
import { UsersModule } from './application/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModule } from './application/admin/admin.module';
import { CategoryModule } from './application/category/category.module';
import { OrderModule } from './application/order/order.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'asfya',
      password: '0521675413',
      database: 'shop',
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    AdminModule,
    CategoryModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
