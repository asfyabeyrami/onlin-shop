import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from 'src/DTO/order.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateAddressDto } from 'src/DTO/address.dto';
import { AuthGuard } from 'src/application/auth/Guard/auth.guard';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // create order for user ***************************************************
  @ApiOperation({
    summary: 'ایجاد سفارش توسط کاربر',
  })
  @ApiBody({
    type: CreateOrderDto,
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

  @Get('orders')
  findAll() {
    return this.orderService.findAll();
  }

  @Get('userOrder')
  async findOne(@Req() req) {
    const userId = req.id;
    return await this.orderService.findOne(userId);
  }

  // // @Patch(':id')
  // // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  // //   return this.orderService.update(+id, updateOrderDto);
  // // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.orderService.remove(+id);
  // }
}
