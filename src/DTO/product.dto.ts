import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  Min,
  Max,
  Length,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({ type: String })
  brandId: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({ type: String })
  categoryId: number;

  @IsNotEmpty({ message: 'نام محصول نمی‌تواند خالی باشد' })
  @IsString()
  @Length(2, 100, { message: 'نام محصول باید بین ۲ تا ۱۰۰ کاراکتر باشد' })
  @ApiProperty({ type: String })
  productName: string;

  @IsNotEmpty({ message: 'کد محصول نمی‌تواند خالی باشد' })
  @IsNumber()
  @Min(1000)
  @ApiProperty({ type: String })
  pCode: number;

  @IsNotEmpty({ message: 'تعداد محصول نمی‌تواند خالی باشد' })
  @IsNumber()
  @Min(0, { message: 'تعداد محصول نمی‌تواند منفی باشد' })
  @ApiProperty({ type: String })
  count: number;

  @IsNotEmpty({ message: 'قیمت محصول نمی‌تواند خالی باشد' })
  @IsNumber()
  @Min(1000, { message: 'قیمت محصول باید حداقل ۱۰۰۰ تومان باشد' })
  @ApiProperty({ type: String, description: 'قیمت محصول به تومان' })
  price: number;

  @IsNotEmpty({ message: 'درصد تخفیف نمی‌تواند خالی باشد' })
  @IsNumber()
  @Min(0, { message: 'درصد تخفیف نمی‌تواند منفی باشد' })
  @Max(100, { message: 'درصد تخفیف نمی‌تواند بیشتر از ۱۰۰ باشد' })
  @ApiProperty({ type: String, description: 'عدد به درصد محاصبه خواهد شد' })
  discount: number;

  @IsNotEmpty({ message: 'آدرس تصویر نمی‌تواند خالی باشد' })
  @IsUrl({}, { message: 'لطفا یک آدرس URL معتبر وارد کنید' })
  @ApiProperty({ type: String })
  picUrl: string;

  @IsNotEmpty({ message: 'توضیحات محصول نمی‌تواند خالی باشد' })
  @IsString()
  @Length(10, 1000, { message: 'توضیحات باید بین ۱۰ تا ۱۰۰۰ کاراکتر باشد' })
  @ApiProperty({ type: String })
  description: string;
}

export class UpdateProductDto {
  @IsOptional()
  @ApiProperty({ type: String })
  brandId: number;

  @IsOptional()
  @ApiProperty({ type: String })
  categoryId: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  productName: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  pCode: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  count: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  price: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  discount: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  picUrl: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  description: string;
}

export class NotAvailableProductDto {
  @IsOptional()
  @ApiProperty({ type: String })
  productName: string;
}

export class CreateCommentDto {
  @IsOptional()
  @ApiProperty({ type: String })
  productId: number;

  @IsNotEmpty({ message: 'متن نظر نمی‌تواند خالی باشد' })
  @IsString()
  @Length(10, 1000, { message: 'متن نظر باید بین ۱۰ تا ۱۰۰۰ کاراکتر باشد' })
  comment: string;
}

export class UpdateCommentDto {
  @IsOptional()
  @ApiProperty({ type: String })
  comment: string;
}
