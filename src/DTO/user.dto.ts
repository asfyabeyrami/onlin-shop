import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsMobilePhone,
  IsBoolean,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  lastName: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  mobile: number;

  @IsNotEmpty()
  @ApiProperty({ type: Boolean })
  isActive: boolean;

  @IsNotEmpty()
  @ApiProperty({ type: Date })
  createdAt: Date;

  @IsNotEmpty()
  @ApiProperty({ type: Date })
  updatedAt: Date;
}

export class RegisterUserDto {
  @IsNotEmpty({ message: 'نام نمی‌تواند خالی باشد' })
  @IsString()
  @ApiProperty({ type: String })
  @Length(2, 50, { message: 'نام باید بین ۲ تا ۵۰ کاراکتر باشد' })
  name: string;

  @IsNotEmpty({ message: 'نام خانوادگی نمی‌تواند خالی باشد' })
  @IsString()
  @ApiProperty({ type: String })
  @Length(2, 50, { message: 'نام خانوادگی باید بین ۲ تا ۵۰ کاراکتر باشد' })
  lastName: string;

  @IsNotEmpty({ message: 'شماره موبایل نمی‌تواند خالی باشد' })
  @ApiProperty({ type: String })
  mobile: number;
}

export class LoginUserDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  mobile: number;
}

export class ResLoginUserDto {
  @ApiProperty({ type: Number })
  status: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  error: string;

  @ApiProperty({ type: String })
  accessToken: string;
}
