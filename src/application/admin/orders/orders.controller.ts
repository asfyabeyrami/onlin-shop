import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/common/eNums/role.enum';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Roles(Role.ADMIN)
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({
    summary: 'لیست سفارشات',
  })
  @Get()
  async findAll() {
    return await this.ordersService.findAll();
  }

  @ApiOperation({
    summary: 'لیست سفارشات جدید ارسال نشده ',
  })
  @Get('newOrder')
  async findAllNewOrder() {
    return await this.ordersService.findAllNewOrder();
  }

  @ApiOperation({
    summary: 'لیست سفارشات درحال ارسال',
  })
  @Get('Deliveri')
  async findAllDeliveri() {
    return await this.ordersService.findAllDeliveri();
  }

  @ApiOperation({
    summary: 'لیست تمام شده ها ',
  })
  @Get('finish')
  async findAllFinish() {
    return await this.ordersService.findAllFinish();
  }

  @ApiOperation({
    summary: 'اطلاعت یک سفارش',
  })
  @Get(':id/getOrderInfo')
  findOne(@Param('id') id: number) {
    return this.ordersService.findOne(id);
  }

  @ApiOperation({
    summary: 'درحال ارسال',
  })
  @Put(':id/sending')
  async updateStatus(@Param('id') id: number) {
    return await this.ordersService.update(id);
  }

  @ApiOperation({
    summary: 'ارسال شد',
  })
  @Put(':id/delivered')
  async finish(@Param('id') id: number) {
    return await this.ordersService.finish(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ordersService.remove(id);
  }
}
