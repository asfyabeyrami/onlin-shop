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
