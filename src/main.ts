import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableCors({
  //   origin: 'http://localhost:3001', // آدرس فرانت‌اند
  //   credentials: true,
  // });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('SHOP')
    .setDescription('Api Documentation')
    .setVersion('1.0')
    .addTag('auth', 'احراز هویت')
    .addTag('adminBrands', 'مدیریت برندها')
    .addTag('adminCategories', 'مدیریت دسته‌بندی‌ها')
    .addTag('adminProduct', 'مدیریت محصولات')
    .addTag('adminOrders', 'مدیریت سفارشات')
    .addTag('adminProvince', 'مدیریت استان ها')
    .addTag('adminCity', 'مدیریت استان ها')
    .addTag('userBasket', 'سبد خرید')
    .addTag('userOrder', 'سفارش کاربران')
    .addTag('userAddress', 'آدرس کاربران')
    .addTag('brand', 'برند ها')
    .addTag('product', 'محصولات')
    .addTag('category', 'دسته بندی')
    .addTag('userComment', 'کامنت ها')
    .addTag('adminComment', 'مدیریت کامنت ها')

    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.APP_PORT);
  console.log(`app running on : ${await app.getUrl()}`);
}
bootstrap();
