import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBrandDto {
  @IsOptional()
  @ApiProperty({ type: String })
  categoryId: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  brandName: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  picUrl: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  description: string;
}
