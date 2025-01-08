import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBrandDto {
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
