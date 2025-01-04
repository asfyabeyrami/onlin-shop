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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { BasketService } from './basket/basket.service';
import { CreateBasketDto } from 'src/DTO/basket.dto';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly basketService: BasketService,
  ) {}

  @Post('createBasket')
  async createBasket(@Req() req, @Body() createBasketDto: CreateBasketDto) {
    const userId = req.id;
    const { productId, count } = createBasketDto;
    return await this.basketService.createBasket(userId, productId, count);
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
