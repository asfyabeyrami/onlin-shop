import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminCommentService } from './admin-comment.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/common/eNums/role.enum';

@ApiTags('adminComment')
@ApiBearerAuth()
@Roles(Role.ADMIN)
@Controller('admin-comment')
export class AdminCommentController {
  constructor(private readonly adminCommentService: AdminCommentService) {}

  @ApiOperation({
    summary: 'لیست کامنت های تایید نشده',
  })
  @Get()
  async findAll() {
    return await this.adminCommentService.findAll();
  }

  @ApiOperation({
    summary: 'کامنت های یک محصول',
  })
  @Get(':productId')
  async findAllCommentAsProductId(@Param('productId') productId: number) {
    return await this.adminCommentService.findAllCommentAsProductId(productId);
  }

  @ApiOperation({
    summary: 'گرفتن یک کامنت با آی دی',
  })
  @Get('single/:id')
  async findOneComment(@Param('id') id: number) {
    return await this.adminCommentService.findOneComment(id);
  }

  @ApiOperation({
    summary: 'تایید کامنت',
  })
  @Patch('approve/:id')
  async update(@Param('id') id: number) {
    return await this.adminCommentService.update(id);
  }

  @ApiOperation({
    summary: 'حذف کامنت',
  })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.adminCommentService.remove(id);
  }
}
