import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateBasketDto {
  @IsNotEmpty({ message: 'شناسه محصول نمی‌تواند خالی باشد' })
  @IsNumber()
  @ApiProperty({ type: String })
  @Min(1, { message: 'شناسه محصول باید عددی مثبت باشد' })
  productId: number;

  @IsNotEmpty({ message: 'تعداد محصول نمی‌تواند خالی باشد' })
  @IsNumber()
  @ApiProperty({ type: String })
  @Min(1, { message: 'تعداد محصول باید حداقل ۱ باشد' })
  count: number;
}
