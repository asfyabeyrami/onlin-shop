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
  Put,
  UseGuards,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateBrandDto, UpdateBrandDto } from 'src/DTO/brand.dto';
import { User } from 'src/decorators/getFromReq.decorators';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/common/eNums/role.enum';

@ApiBearerAuth()
@Roles(Role.ADMIN)
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
  async createBrand(
    @User('id') adminId: number,
    @Body() createBrandDto: CreateBrandDto,
  ) {
    const { brandName, picUrl, description } = createBrandDto;

    return this.brandService.create(adminId, brandName, picUrl, description);
  }

  @ApiOperation({
    summary: 'لیست برند ها',
  })
  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @ApiOperation({
    summary: ' گرفتن برند با آی دی ',
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.brandService.findOne(id);
  }

  @ApiOperation({
    summary: 'گرفتن برند با اسم',
  })
  @Get('name/:brandName')
  findWithName(@Param('brandName') brandName: string) {
    return this.brandService.findWithName(brandName);
  }

  @ApiOperation({
    summary: 'آپدیت برند',
  })
  @Put(':id')
  async update(
    @User('id') adminId: number,
    @Param('id') id: number,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return await this.brandService.update(id, adminId, updateBrandDto);
  }

  @ApiOperation({
    summary: 'حذف برند',
  })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.brandService.remove(+id);
  }
}
