import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from 'src/DTO/user.dto';
import { LoginAdminDto, RegisterAdminDto } from 'src/DTO/admin.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'ثبت نام کاربر',
  })
  @Post('registerUser')
  @HttpCode(HttpStatus.OK)
  async registerUser(@Body() payload: RegisterUserDto) {
    return await this.authService.register(payload);
  }

  @ApiOperation({
    summary: 'ورود کاربر',
  })
  @Post('loginUser')
  async loginUser(@Body() payload: LoginUserDto) {
    return await this.authService.login(payload);
  }

  @ApiOperation({
    summary: 'ثبت نام ادمین',
  })
  @Post('registerAdmin')
  @HttpCode(HttpStatus.OK)
  async registerAdmin(@Body() payload: RegisterAdminDto) {
    return await this.authService.registerAdmin(payload);
  }

  @ApiOperation({
    summary: 'ورود ادمین',
  })
  @Post('loginAdmin')
  async loginAdmin(@Body() payload: LoginAdminDto) {
    return await this.authService.loginAdmin(payload);
  }
}
