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
  Res,
  HttpException,
  Req,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AdminService } from './admin.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CategoryService } from './category/category.service';
import { CreateCategoryDto } from 'src/DTO/category.dto';
import { CreateBrandDto } from 'src/DTO/brand.dto';
import { BrandService } from './brand/brand.service';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService,
  ) {}

  @Post('createCategory')
  async createCategory(
    @Req() req,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    const adminId = req.id;
    const { title, fatherId } = createCategoryDto;

    return this.categoryService.create(adminId, title, fatherId);
  }

  @Post('createBrand')
  async createBrand(@Req() req, @Body() createBrandDto: CreateBrandDto) {
    const adminId = req.id;
    const { categoryId, brandName, picUrl, description } = createBrandDto;

    return this.brandService.create(
      adminId,
      categoryId,
      brandName,
      picUrl,
      description,
    );
  }

  @Get()
  findAll(@Req() req) {
    console.log(req.id);
    return { massage: 'access', adminId: req.id, userName: req.userName };
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.adminService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
  //   return this.adminService.update(+id, updateAdminDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
