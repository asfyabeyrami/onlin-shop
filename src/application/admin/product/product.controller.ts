import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  CreateProductDto,
  NotAvailableProductDto,
  UpdateProductDto,
} from 'src/DTO/product.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/common/eNums/role.enum';
import { User } from 'src/decorators/getFromReq.decorators';

@Roles(Role.ADMIN)
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //create product ***************************************************
  @ApiOperation({
    summary: 'ایجاد محصولات',
  })
  @ApiBody({
    type: CreateProductDto,
    description: 'ایجاد محصولات',
  })
  @ApiOkResponse({
    description: 'محصول با موفقیت ثبت شد',
  })
  @Post('createProduct')
  @HttpCode(HttpStatus.OK)
  async createProduct(
    @User('id') adminId: number,
    @Body() createProductDto: CreateProductDto,
  ) {
    const {
      brandId,
      categoryId,
      productName,
      pCode,
      count,
      price,
      discount,
      picUrl,
      description,
    } = createProductDto;

    return this.productService.create(
      adminId,
      brandId,
      categoryId,
      productName,
      pCode,
      count,
      price,
      discount,
      picUrl,
      description,
    );
  }

  // de active product ***************************************************
  @ApiOperation({
    summary: 'غیر فعال کردن محصول',
  })
  @ApiOkResponse({
    description: 'محصول مورد نظر ناموجود شد',
    type: Boolean,
  })
  @Post('isNotAvailableProduct')
  async notAvailable(
    @Body() notAvailableProductDto: NotAvailableProductDto,
  ): Promise<boolean> {
    await this.productService.notAvailable(notAvailableProductDto.productName);
    return true;
  }

  @ApiOperation({
    summary: 'گرفتن محصولات یک دسته‌بندی',
  })
  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    return this.productService.findAllAsCat(category);
  }

  @ApiOperation({
    summary: 'لیست محصولات',
  })
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @ApiOperation({
    summary: ' گرفتن محصول با آی دی ',
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @ApiOperation({
    summary: 'گرفتن محصول با اسم',
  })
  @Get('name/:productName')
  findWithName(@Param('productName') productName: string) {
    return this.productService.findWithName(productName);
  }

  @ApiOperation({
    summary: 'آپدیت محصول ',
  })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @User('id') adminId: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.update(id, adminId, updateProductDto);
  }

  @ApiOperation({
    summary: 'حذف محصول ',
  })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.productService.remove(+id);
  }
}
