import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BrandsService } from './brand.service';
import { Public } from 'src/decorators/roles.decorator';
import { ApiOperation } from '@nestjs/swagger';
@Public()
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @ApiOperation({
    summary: 'لیست برند ها',
  })
  @Get()
  async findAll() {
    return await this.brandsService.findAll();
  }

  @ApiOperation({
    summary: 'گرفتن برند با آی دی',
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.brandsService.findOne(id);
  }
}
