import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('logOut')
  async logOut(@Req() req): Promise<boolean> {
    const userId = req.id;
    try {
      await this.usersService.logOut(userId);
    } catch (e) {
      Logger.error(e.massage);
    }
    return true;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({
    summary: 'غیرفعال کردن کاربر',
  })
  @Patch(':id')
  async deActiveUser(@Param('id') id: number) {
    return await this.usersService.deActiveUser(id);
  }

  @ApiOperation({
    summary: 'حذف کاربر',
  })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
