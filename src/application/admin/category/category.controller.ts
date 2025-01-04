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
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateCategoryDto } from 'src/DTO/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // create category ***************************************************
  @ApiOperation({
    summary: 'ایجاد دسته بندی محصولات',
  })
  @ApiBody({
    type: CreateCategoryDto,
    description: 'ایجاد دسته بندی محصولات',
  })
  @ApiOkResponse({
    description: 'دستبندی جدید با موفقیت ثبت شد',
  })
  @Post('createCategory')
  @HttpCode(HttpStatus.OK)
  async createCategory(
    @Req() req,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    const adminId = req.id;
    const { title, fatherId } = createCategoryDto;

    return this.categoryService.create(adminId, title, fatherId);
  }

  // @Get()
  // findAll() {
  //   return this.categoryService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categoryService.findOne(+id);
  // }

  // // @Patch(':id')
  // // update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
  // //   return this.categoryService.update(+id, updateCategoryDto);
  // // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.categoryService.remove(+id);
  // }
}
