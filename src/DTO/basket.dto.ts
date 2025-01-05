import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBasketDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  productId: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  count: number;
}
