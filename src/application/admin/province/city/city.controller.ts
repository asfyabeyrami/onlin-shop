import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto, UpdateCityDto } from 'src/DTO/address.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/common/eNums/role.enum';
import { User } from 'src/decorators/getFromReq.decorators';

@ApiTags('adminCity')
@Roles(Role.ADMIN)
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
