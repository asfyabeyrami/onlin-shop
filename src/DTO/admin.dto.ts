import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AdminDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  userName: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;
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
