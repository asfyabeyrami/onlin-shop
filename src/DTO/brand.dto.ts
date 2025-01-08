import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty({ message: 'نام برند نمی‌تواند خالی باشد' })
  @IsString()
  @Length(2, 50, { message: 'نام برند باید بین ۲ تا ۵۰ کاراکتر باشد' })
  brandName: string;

  @IsNotEmpty({ message: 'آدرس تصویر نمی‌تواند خالی باشد' })
  @IsUrl({}, { message: 'لطفا یک آدرس URL معتبر وارد کنید' })
  picUrl: string;

  @IsOptional()
  @IsString()
  @Length(0, 500, { message: 'توضیحات نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد' })
  description: string;
}

export class UpdateBrandDto {
  @IsOptional()
  @ApiProperty({ type: String })
  brandName: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  picUrl: string;

  @IsOptional()
  @ApiProperty({ type: String })
  description: string;
}
