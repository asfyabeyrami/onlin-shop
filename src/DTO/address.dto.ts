import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  IsPostalCode,
  Min,
} from 'class-validator';

export class CreateProvinceDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  province: string;
}
export class CreateCityDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  provinceId: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  city: string;
}

export class UpdateCityDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  provinceId: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  city: string;
}

export class CreateAddressDto {
  @IsNotEmpty({ message: 'شناسه شهر نمی‌تواند خالی باشد' })
  @IsNumber()
  @ApiProperty({ type: String })
  @Min(1)
  cityId: number;

  @IsNotEmpty({ message: 'آدرس نمی‌تواند خالی باشد' })
  @IsString()
  @ApiProperty({ type: String })
  @Length(10, 500, { message: 'آدرس باید بین ۱۰ تا ۵۰۰ کاراکتر باشد' })
  address: string;

  @IsNotEmpty({ message: 'کد پستی نمی‌تواند خالی باشد' })
  @IsPostalCode('IR', { message: 'لطفا یک کد پستی معتبر ایران وارد کنید' })
  @ApiProperty({ type: String })
  zipCode: number;
}

export class EditAddressDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  cityId: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  address: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  zipCode: number;
}
