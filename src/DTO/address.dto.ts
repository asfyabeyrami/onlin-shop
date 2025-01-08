import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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
