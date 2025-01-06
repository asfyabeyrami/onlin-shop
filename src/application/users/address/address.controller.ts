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
} from '@nestjs/swagger';
import { AuthGuard } from 'src/application/auth/Guard/auth.guard';
import { AuthorizationGuard } from '../../auth/Guard/authorization.guard';
import { Roles } from '../../../decorators/roles.decorator';
import { Role } from 'src/common/eNums/role.enum';

@UseGuards(AuthGuard, AuthorizationGuard)
@ApiBearerAuth()
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
  async createAddress(@Req() req, @Body() createBasketDto: CreateAddressDto) {
    const userId = req.id;
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

  // @Get()
  // findAll() {
  //   return this.addressService.findAll();
  // }

  @ApiOperation({
    summary: 'پیدا کردن آدرس های یک کاربر با آی دی',
  })
  @Get(':id')
  @Roles(Role.USER)
  findAll(@Param('id') userId: number) {
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
