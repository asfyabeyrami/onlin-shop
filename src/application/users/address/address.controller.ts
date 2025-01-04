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
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from 'src/DTO/address.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/application/auth/auth.guard';

@UseGuards(AuthGuard)
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

  // @Get()
  // findAll() {
  //   return this.addressService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.addressService.findOne(+id);
  // }

  // // @Patch(':id')
  // // update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
  // //   return this.addressService.update(+id, updateAddressDto);
  // // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.addressService.remove(+id);
  // }
}
