import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
  HttpException,
  Req,
  UseGuards,
  Logger,
  Put,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AdminService } from './admin.service';
import { AuthGuard } from '../auth/Guard/auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthorizationGuard } from '../auth/Guard/authorization.guard';

@UseGuards(AuthGuard, AuthorizationGuard)
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @Get()
  // findAll(@Req() req) {
  //   console.log(req.id);
  //   return { massage: 'access', adminId: req.id, userName: req.userName };
  // }

  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   return this.adminService.findOne(id);
  // }

  // // @Patch(':id')
  // // update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
  // //   return this.adminService.update(+id, updateAdminDto);
  // // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.adminService.remove(+id);
  // }
}
