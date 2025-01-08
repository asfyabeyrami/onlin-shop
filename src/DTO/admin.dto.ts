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
  @Length(4, 20, { message: 'نام کاربری باید بین ۴ تا ۲۰ کاراکتر باشد' })
  userName: string;

  @IsNotEmpty({ message: 'رمز عبور نمی‌تواند خالی باشد' })
  @IsString()
  @Length(8, 20, { message: 'رمز عبور باید بین ۸ تا ۲۰ کاراکتر باشد' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'رمز عبور باید شامل حروف بزرگ، کوچک و اعداد باشد',
  })
  password: string;
}

export class LoginAdminDto {
  @IsNotEmpty({ message: 'نام کاربری نمی‌تواند خالی باشد' })
  @IsString()
  userName: string;

  @IsNotEmpty({ message: 'رمز عبور نمی‌تواند خالی باشد' })
  @IsString()
  password: string;
}
