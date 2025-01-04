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
import { AuthGuard } from 'src/application/auth/auth.guard';

@UseGuards(AuthGuard)
@ApiBearerAuth()
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
  async createBasket(@Req() req, @Body() createBasketDto: CreateBasketDto) {
    const userId = req.id;
    const { productId, count } = createBasketDto;
    return await this.basketService.createBasket(userId, productId, count);
  }

  // @Get()
  // findAll() {
  //   return this.basketService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.basketService.findOne(+id);
  // }

  // // @Patch(':id')
  // // update(@Param('id') id: string, @Body() updateBasketDto: UpdateBasketDto) {
  // //   return this.basketService.update(+id, updateBasketDto);
  // // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.basketService.remove(+id);
  // }
}
