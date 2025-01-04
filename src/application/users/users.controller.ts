import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { BasketService } from './basket/basket.service';
import { CreateBasketDto } from 'src/DTO/basket.dto';
import { CreateAddressDto } from 'src/DTO/address.dto';
import { AddressService } from './address/address.service';
import { CreateOrderDto } from 'src/DTO/order.dto';
import { OrderService } from './order/order.service';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly basketService: BasketService,
    private readonly addressService: AddressService,
    private readonly orderService: OrderService,
  ) {}

  // create basket from user***************************************************
  @ApiOperation({
    summary: 'ایجاد سبد خرید',
  })
  @ApiBody({
    type: CreateBasketDto,
    description: 'ایجاد سبد خرید',
  })
  @ApiOkResponse({
    description: 'سبد خرید شما ایجاد شد',
  })
  @Post('createBasket')
  @HttpCode(HttpStatus.OK)
  async createBasket(@Req() req, @Body() createBasketDto: CreateBasketDto) {
    const userId = req.id;
    const { productId, count } = createBasketDto;
    return await this.basketService.createBasket(userId, productId, count);
  }

  // create address for user ***************************************************
  @ApiOperation({
    summary: 'ایجاد آدرس توسط کاربر',
  })
  @ApiBody({
    type: CreateAddressDto,
    description: 'ایجاد آدرس توسط کاربر',
  })
  @ApiOkResponse({
    description: 'آدرس شما با موفقیت ایجاد شد',
  })
  @Post('createAddress')
  @HttpCode(HttpStatus.OK)
  async createAddress(@Req() req, @Body() createBasketDto: CreateAddressDto) {
    const userId = req.id;
    const { cityId, address, zipCode } = createBasketDto;
    return await this.addressService.create(userId, cityId, address, zipCode);
  }

  // create order for user ***************************************************
  @ApiOperation({
    summary: 'ایجاد سفارش توسط کاربر',
  })
  @ApiBody({
    type: CreateAddressDto,
    description: 'ایجاد سفازش توسط کاربر',
  })
  @ApiOkResponse({
    description: 'سفارش شما با موفقیت ثبت شد',
  })
  @Post('createOrder')
  @HttpCode(HttpStatus.OK)
  async createOrder(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    const userId = req.id;
    const { basketId, addressId, delivery, paymentMethod } = createOrderDto;
    return await this.orderService.create(
      userId,
      basketId,
      addressId,
      delivery,
      paymentMethod,
    );
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({
    summary: 'حذف کاربر',
  })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
