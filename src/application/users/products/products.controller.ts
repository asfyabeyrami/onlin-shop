import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Public } from 'src/decorators/roles.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Public()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({
    summary: 'محصولات',
  })
  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @ApiOperation({
    summary: 'گرفتن محصول با آی دی',
  })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.productsService.findOne(id);
  }
}
