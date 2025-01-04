import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProvinceService } from './province.service';
import { AuthGuard } from 'src/application/auth/auth.guard';
import { CreateProvinceDto } from 'src/DTO/address.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Post()
  create(@Req() req, @Body() createProvinceDto: CreateProvinceDto) {
    const adminId = req.id;
    return this.provinceService.create(adminId, createProvinceDto);
  }

  @Get()
  findAll() {
    return this.provinceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.provinceService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProvinceDto: UpdateProvinceDto) {
  //   return this.provinceService.update(+id, updateProvinceDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.provinceService.remove(+id);
  }
}
