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
  UseGuards,
  Put,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto, UpdateCityDto } from 'src/DTO/address.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateCategoryDto } from 'src/DTO/category.dto';
import { AuthGuard } from 'src/application/auth/Guard/auth.guard';
import { AuthorizationGuard } from 'src/application/auth/Guard/authorization.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/common/eNums/role.enum';
import { User } from 'src/decorators/getFromReq.decorators';

@UseGuards(AuthGuard, AuthorizationGuard)
@ApiBearerAuth()
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
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  async createCity(
    @User('id') adminId: number,
    @Body() createCityDto: CreateCityDto,
  ) {
    return await this.cityService.create(adminId, createCityDto);
  }

  @ApiOperation({
    summary: ' لیست شهر ها',
  })
  @Get()
  async findAll() {
    return await this.cityService.findAll();
  }

  @ApiOperation({
    summary: ' حذف شهر ',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cityService.remove(+id);
  }
}
