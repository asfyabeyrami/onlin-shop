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
} from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from 'src/DTO/address.dto';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateCategoryDto } from 'src/DTO/category.dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  // create city ***************************************************
  @ApiOperation({
    summary: 'ایجاد شهر جدید',
  })
  @ApiBody({
    type: CreateCityDto,
    description: 'ایجاد شهر جدید',
  })
  @ApiOkResponse({
    description: 'شهر وارد شده با موفقیت ثبت شد',
  })
  @Post('createCity')
  @HttpCode(HttpStatus.OK)
  createCity(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
  }

  // @Get()
  // findAll() {
  //   return this.cityService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cityService.findOne(+id);
  // }

  // // @Patch(':id')
  // // update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
  // //   return this.cityService.update(+id, updateCityDto);
  // // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cityService.remove(+id);
  // }
}
