import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from 'src/DTO/user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'ثبت نام کاربر',
  })
  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() payload: RegisterUserDto) {
    return await this.authService.register(payload);
  }

  @ApiOperation({
    summary: 'ورود کاربر',
  })
  @Post('login')
  async login(@Body() payload: LoginUserDto) {
    return await this.authService.login(payload);
  }
}
