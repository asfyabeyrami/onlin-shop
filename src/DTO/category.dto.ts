import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  title: string;

  @IsOptional()
  @ApiProperty({ type: String })
  fatherId: number;
}
