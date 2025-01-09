import {
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  Min,
  Length,
  IsString,
} from 'class-validator';
import { Method } from '../common/eNums/paymentMethod.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'شناسه آدرس نمی‌تواند خالی باشد' })
  @IsNumber()
  @ApiProperty({ type: String })
  @Min(1, { message: 'شناسه آدرس باید عددی مثبت باشد' })
  addressId: number;

  @IsNotEmpty({ message: 'روش ارسال نمی‌تواند خالی باشد' })
  @IsString()
  @ApiProperty({ type: String })
  @Length(3, 50, { message: 'روش ارسال باید بین ۳ تا ۵۰ کاراکتر باشد' })
  delivery: string;

  @IsNotEmpty({ message: 'روش پرداخت نمی‌تواند خالی باشد' })
  @IsEnum(Method, { message: 'روش پرداخت نامعتبر است' })
  @ApiProperty({ type: String })
  paymentMethod: Method;
}
