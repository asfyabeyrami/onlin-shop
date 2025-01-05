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
  Patch,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBody,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  LoginUserDto,
  RegisterUserDto,
  ResLoginUserDto,
  UserDto,
} from 'src/DTO/user.dto';
import {
  AdminDto,
  adminObj,
  LoginAdminDto,
  RegisterAdminDto,
} from 'src/DTO/admin.dto';
import { MobilePipe } from 'src/pipe/mobile.pipe';
import { UsersService } from '../users/users.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}
  // register user************************************************************
  @ApiOperation({
    summary: 'ثبت نام کاربر',
  })
  @ApiBody({
    type: RegisterUserDto,
    description: 'ثبت نام کاربر',
  })
  @ApiOkResponse({
    description: 'user login successful',
    type: UserDto,
  })
  @UsePipes(new MobilePipe())
  @Post('registerUser')
  @HttpCode(HttpStatus.OK)
  async registerUser(@Body() payload: RegisterUserDto) {
    return await this.authService.register(payload);
  }
  // login user************************************************************
  @ApiOperation({
    summary: 'ورود کاربر',
  })
  @ApiBody({
    type: LoginUserDto,
    description: 'ورود کاربر',
  })
  @ApiOkResponse({
    description: 'user login successful',
    type: ResLoginUserDto,
  })
  @ApiNotFoundResponse({ description: 'کاربر وجود ندارد' })
  @Post('loginUser')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() payload: LoginUserDto) {
    return await this.authService.login(payload);
  }

  // logout user************************************************************
  @ApiOperation({
    summary: 'خروج کاربر',
  })
  @ApiOkResponse({
    description: 'user logout',
    type: Boolean,
  })
  @Post('logOutUser')
  @HttpCode(HttpStatus.OK)
  async logOut(@Req() req): Promise<boolean> {
    const userId = req.id;
    try {
      await this.authService.logOutUser(userId);
    } catch (e) {
      Logger.error(e.massage);
    }
    return true;
  }

  // register admin************************************************************
  @ApiOperation({
    summary: 'ثبت نام ادمین',
  })
  @ApiBody({
    type: RegisterAdminDto,
    description: 'ثبت نام ادمین',
  })
  @ApiOkResponse({
    description: 'admin login successful',
    type: RegisterAdminDto,
  })
  @Post('registerAdmin')
  @HttpCode(HttpStatus.OK)
  async registerAdmin(@Body() payload: RegisterAdminDto) {
    return await this.authService.registerAdmin(payload);
  }

  // login admin************************************************************
  @ApiOperation({
    summary: 'ورود ادمین',
  })
  @ApiBody({
    type: LoginAdminDto,
    description: 'ورود ادمین',
  })
  @ApiOkResponse({
    description: 'admin login successful',
    type: AdminDto,
  })
  @ApiNotFoundResponse({ description: 'ادمین وجود ندارد' })
  @Post('loginAdmin')
  async loginAdmin(@Body() payload: LoginAdminDto) {
    return await this.authService.loginAdmin(payload);
  }

  // logout admin************************************************************
  @ApiOperation({
    summary: 'خروج ادمین',
  })
  @ApiOkResponse({
    description: 'admin logout',
    type: Boolean,
  })
  @Post('logOutAdmin')
  @HttpCode(HttpStatus.OK)
  async logOutAdmin(@Req() req): Promise<boolean> {
    const adminId = req.id;
    try {
      await this.authService.logOutAdmin(adminId);
    } catch (e) {
      Logger.error(e.massage);
    }
    return true;
  }

  @ApiOperation({
    summary: 'غیرفعال کردن کاربر',
  })
  @Patch(':id')
  async deActiveUser(@Param('id') id: number) {
    return await this.userService.deActiveUser(id);
  }
}
