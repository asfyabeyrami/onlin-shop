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
  UseGuards,
  Put,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto, EditAddressDto } from 'src/DTO/address.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/application/auth/Guard/auth.guard';
import { AuthorizationGuard } from '../../auth/Guard/authorization.guard';
import { Roles } from '../../../decorators/roles.decorator';
import { Role } from 'src/common/eNums/role.enum';
import { ProvinceDataAccess } from 'src/dataAccess/province.dataAccess';
import { User } from 'src/decorators/getFromReq.decorators';

@ApiTags('userAddress')
@ApiBearerAuth()
@Roles(Role.USER)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  // create address for user ***************************************************
  @ApiOperation({
    summary: 'ایجاد آدرس توسط کاربر',
  })
  @ApiBody({
    type: CreateAddressDto,
    description: 'ایجاد آدرس توسط کاربر',
  })
  @ApiOkResponse({
    description: 'آدرس شما با موفقیت ایجاد شد',
  })
  @Post('createAddress')
  @HttpCode(HttpStatus.OK)
  async createAddress(
    @User('id') userId: number,
    @Body() createBasketDto: CreateAddressDto,
  ) {
    const { cityId, address, zipCode } = createBasketDto;
    return await this.addressService.create(userId, cityId, address, zipCode);
  }

  // edit address for user ***************************************************
  @ApiOperation({
    summary: 'تغییر آدرس توسط کاربر',
  })
  @ApiBody({
    type: CreateAddressDto,
    description: 'تغییر آدرس توسط کاربر',
  })
  @ApiOkResponse({
    description: 'آدرس جدید با موفقیت ایجاد شد',
  })
  @Put('editAddress')
  @HttpCode(HttpStatus.OK)
  async editAddress(@Req() req, @Body() editAddressDto: EditAddressDto) {
    const userId = req.id;
    const { cityId, address, zipCode } = editAddressDto;
    await this.addressService.updateAddress(userId, cityId, address, zipCode);
    return `{آدرس شما تغییر یافت}`;
  }

  @ApiOperation({
    summary: 'لیست استان ها ',
  })
  @Get('Province')
  async findAllProvince() {
    return await this.addressService.findAllProvince();
  }

  @ApiOperation({
    summary: 'لیست شهر ها',
  })
  @Get('city/:province')
  async findAllCity(@Param('province') province: string) {
    return await this.addressService.findAllCity(province);
  }

  @ApiOperation({
    summary: 'پیدا کردن آدرس های یک کاربر ',
  })
  @Get('findUserAddress')
  @Roles(Role.USER)
  findAll(@User('id') userId: number) {
    return this.addressService.findAll(userId);
  }

  @ApiOperation({
    summary: 'حذف آدرس کاربر',
  })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.addressService.remove(id);
  }
}
