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
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateProductDto, NotAvailableProductDto } from 'src/DTO/product.dto';

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
  async createProduct(@Req() req, @Body() createProductDto: CreateProductDto) {
    const adminId = req.id;
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

  // @Get()
  // findAll() {
  //   return this.productService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productService.remove(+id);
  // }
}
