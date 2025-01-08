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
import { Public, Roles } from '../../decorators/roles.decorator';
import { User } from 'src/decorators/getFromReq.decorators';
import { Role } from 'src/common/eNums/role.enum';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
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
  @Public()
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
  @Public()
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
  @Public()
  @Post('logOutUser')
  @HttpCode(HttpStatus.OK)
  async logOut(@User('id') userId: number): Promise<boolean> {
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
  @Public()
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
  @Public()
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
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('logOutAdmin')
  async logOutAdmin(@User('id') adminId: number): Promise<boolean> {
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
  @Roles(Role.ADMIN)
  @Patch(':id')
  async deActiveUser(@Param('id') id: number) {
    return await this.authService.deActiveUser(id);
  }
}
