import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/common/eNums/role.enum';
import { CreateCommentDto, UpdateCommentDto } from 'src/DTO/product.dto';
import { User } from 'src/decorators/getFromReq.decorators';

@ApiBearerAuth()
@Roles(Role.USER)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({
    summary: 'ایجاد نظر',
  })
  @Post()
  async create(
    @User('id') userId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.commentService.create(userId, createCommentDto);
  }

  @ApiOperation({
    summary: 'تغییر',
  })
  @Patch(':id')
  async update(
    @User('id') userId: number,
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return await this.commentService.update(id, userId, updateCommentDto);
  }

  @ApiOperation({
    summary: 'حذف',
  })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.commentService.remove(id);
  }
}
