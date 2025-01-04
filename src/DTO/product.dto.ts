import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
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
  discount: string;

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
