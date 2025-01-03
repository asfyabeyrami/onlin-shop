import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
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
  @ApiProperty({ type: String })
  password: string;

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
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  lastName: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  mobile: number;
}

export class LoginUserDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  mobile: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;
}
