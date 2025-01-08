import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Public } from 'src/decorators/roles.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Public()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({
    summary: 'لیست دسته بندی ها',
  })
  @Get()
  async findAll() {
    return await this.categoriesService.findAll();
  }

  @ApiOperation({
    summary: 'گرفتن دسته بندی با آی دی',
  })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.categoriesService.findOne(id);
  }
}
