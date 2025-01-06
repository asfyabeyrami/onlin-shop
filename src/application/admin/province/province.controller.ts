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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProvinceService } from './province.service';
import { AuthGuard } from 'src/application/auth/Guard/auth.guard';
import { CreateProvinceDto } from 'src/DTO/address.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/common/eNums/role.enum';
import { AuthorizationGuard } from 'src/application/auth/Guard/authorization.guard';
import { User } from 'src/decorators/getFromReq.decorators';

@UseGuards(AuthGuard, AuthorizationGuard)
@ApiBearerAuth()
@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  // create Province ***************************************************
  @ApiOperation({
    summary: 'ایجاد استان جدید',
  })
  @ApiBody({
    type: CreateProvinceDto,
    description: 'ایجاد استان جدید',
  })
  @ApiOkResponse({
    description: 'استان وارد شده با موفقیت ثبت شد',
  })
  @Post('createProvince')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  createProvince(
    @User('id') adminId: number,
    @Body() createProvinceDto: CreateProvinceDto,
  ) {
    return this.provinceService.create(adminId, createProvinceDto);
  }

  @ApiOperation({
    summary: ' لیست استان ها ',
  })
  @Get()
  async findAll() {
    return await this.provinceService.findAll();
  }

  @ApiOperation({
    summary: ' حذف استان ',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.provinceService.remove(+id);
  }
}
