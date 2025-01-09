import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export function adminObj(admin, token = null) {
  return {
    id: admin.id,
    userName: admin.userName,
    token: token || null,
  };
}

export class AdminDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  userName: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  token: string;
}

export class RegisterAdminDto {
  @IsNotEmpty({ message: 'نام کاربری نمی‌تواند خالی باشد' })
  @IsString()
  @ApiProperty({ type: String })
  @Length(4, 20, { message: 'نام کاربری باید بین ۴ تا ۲۰ کاراکتر باشد' })
  userName: string;

  @IsNotEmpty({ message: 'رمز عبور نمی‌تواند خالی باشد' })
  @IsString()
  @ApiProperty({ type: String })
  password: string;
}

export class LoginAdminDto {
  @IsNotEmpty({ message: 'نام کاربری نمی‌تواند خالی باشد' })
  @IsString()
  @ApiProperty({ type: String })
  userName: string;

  @IsNotEmpty({ message: 'رمز عبور نمی‌تواند خالی باشد' })
  @IsString()
  @ApiProperty({ type: String })
  password: string;
}
