import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BasketProductService } from './basket-product.service';

@Controller('basket-product')
export class BasketProductController {
  constructor(private readonly basketProductService: BasketProductService) {}

  // @Post()
  // create(@Body() createBasketProductDto: CreateBasketProductDto) {
  //   return this.basketProductService.create(createBasketProductDto);
  // }

  @Get()
  findAll() {
    return this.basketProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basketProductService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBasketProductDto: UpdateBasketProductDto) {
  //   return this.basketProductService.update(+id, updateBasketProductDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basketProductService.remove(+id);
  }
}
