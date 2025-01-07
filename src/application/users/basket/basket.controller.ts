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
import { BasketService } from './basket.service';
import { CreateBasketDto } from 'src/DTO/basket.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/application/auth/Guard/auth.guard';
import { AuthorizationGuard } from 'src/application/auth/Guard/authorization.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/common/eNums/role.enum';
import { User } from 'src/decorators/getFromReq.decorators';

@ApiBearerAuth()
@Roles(Role.USER)
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

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
  async createBasket(
    @User('id') userId: number,
    @Body() createBasketDto: CreateBasketDto,
  ) {
    const { productId, count } = createBasketDto;
    return await this.basketService.createBasket(userId, productId, count);
  }

  // @Get()
  // findAll() {
  //   return this.basketService.findAll();
  // }

  @ApiOperation({
    summary: 'مشاهده سبد خرید',
  })
  @Get('userBaskets')
  async findOne(@User('id') userId: number) {
    return await this.basketService.findOne(userId);
  }

  @ApiOperation({
    summary: 'حذف سبد خرید ',
  })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.basketService.remove(id);
  }
}
