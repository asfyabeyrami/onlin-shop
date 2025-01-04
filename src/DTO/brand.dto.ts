import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBrandDto {
  @IsOptional()
  @ApiProperty({ type: String })
  categoryId: number;

  @IsOptional()
  @ApiProperty({ type: String })
  brandName: string;

  @IsOptional()
  @ApiProperty({ type: String })
  fatherId: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  picUrl: string;

  @IsOptional()
  @ApiProperty({ type: String })
  description: string;
}
