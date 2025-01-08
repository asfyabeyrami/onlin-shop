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
import { CategoryService } from './category.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/DTO/category.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/common/eNums/role.enum';
import { User } from 'src/decorators/getFromReq.decorators';

@ApiTags('adminCategories')
@Roles(Role.ADMIN)
@ApiBearerAuth()
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
    @User('id') adminId: number,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    const { title, fatherId } = createCategoryDto;

    return this.categoryService.create(adminId, title, fatherId);
  }

  @ApiOperation({
    summary: 'لیست دسته بندی ها',
  })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({
    summary: 'گرفتن محصولات یک دسته‌بندی',
  })
  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    return this.categoryService.findAllAsCat(category);
  }

  @ApiOperation({
    summary: ' گرفتن دسته بندی با آی دی ',
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }

  @ApiOperation({
    summary: 'آپدیت دسته بندی',
  })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @User('id') adminId: number,
    @Body() updateBrandDto: UpdateCategoryDto,
  ) {
    return await this.categoryService.update(id, adminId, updateBrandDto);
  }

  @ApiOperation({
    summary: 'حذف دسته بندی',
  })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoryService.remove(+id);
  }
}
