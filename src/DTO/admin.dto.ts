import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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
  @IsNotEmpty()
  @ApiProperty({ type: String })
  userName: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;
}

export class LoginAdminDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  userName: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;
}
