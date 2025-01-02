import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
  Req,
  Logger,
  UsePipes,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from 'src/DTO/user.dto';
import { LoginAdminDto, RegisterAdminDto } from 'src/DTO/admin.dto';
import { MobilePipe } from 'src/pipe/mobile.pipe';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'ثبت نام کاربر',
  })
  @UsePipes(new MobilePipe())
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
    summary: 'خروج کاربر',
  })
  @Post('logOutUser')
  async logOut(@Req() req): Promise<boolean> {
    const userId = req.id;
    try {
      await this.authService.logOutUser(userId);
    } catch (e) {
      Logger.error(e.massage);
    }
    return true;
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

  @ApiOperation({
    summary: 'خروج ادمین',
  })
  @Post('logOutAdmin')
  async logOutAdmin(@Req() req): Promise<boolean> {
    const adminId = req.id;
    try {
      await this.authService.logOutAdmin(adminId);
    } catch (e) {
      Logger.error(e.massage);
    }
    return true;
  }
}
