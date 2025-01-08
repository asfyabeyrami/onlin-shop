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
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/common/eNums/role.enum';
import { User } from 'src/decorators/getFromReq.decorators';

@ApiBearerAuth()
@Roles(Role.USER)
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
  async createOrder(
    @User('id') userId: number,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const { addressId, delivery, paymentMethod } = createOrderDto;
    return await this.orderService.create(
      userId,
      addressId,
      delivery,
      paymentMethod,
    );
  }

  @ApiOperation({
    summary: 'مشاهده سفارش',
  })
  @Get('userOrder')
  async findOne(@User('id') userId: number) {
    return await this.orderService.findOne(userId);
  }

  @ApiOperation({
    summary: 'حذف سفارش',
  })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.orderService.remove(id);
  }
}
