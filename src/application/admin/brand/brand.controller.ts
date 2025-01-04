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
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateBrandDto } from 'src/DTO/brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  //create brand ***************************************************
  @ApiOperation({
    summary: 'ایجاد برند جدید',
  })
  @ApiBody({
    type: CreateBrandDto,
    description: 'ایجاد برند جدید',
  })
  @ApiOkResponse({
    description: 'برند جدید با موفقیت ثبت شد',
  })
  @Post('createBrand')
  @HttpCode(HttpStatus.OK)
  async createBrand(@Req() req, @Body() createBrandDto: CreateBrandDto) {
    const adminId = req.id;
    const { brandName, picUrl, description } = createBrandDto;

    return this.brandService.create(adminId, brandName, picUrl, description);
  }

  // @Get()
  // findAll() {
  //   return this.brandService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.brandService.findOne(+id);
  // }

  // // @Patch(':id')
  // // update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
  // //   return this.brandService.update(+id, updateBrandDto);
  // // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.brandService.remove(+id);
  // }
}
