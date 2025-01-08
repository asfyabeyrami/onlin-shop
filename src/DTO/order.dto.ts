import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  @ApiProperty({ type: String })
  addressId: number;

  @IsOptional()
  @ApiProperty({ type: String })
  delivery: string;

  @IsOptional()
  @ApiProperty({ type: String })
  paymentMethod: string;
}
