import { Module } from '@nestjs/common';
import { AdminCommentService } from './admin-comment.service';
import { AdminCommentController } from './admin-comment.controller';
import { CommentDataAccess } from 'src/dataAccess/comment.dataAccess';

@Module({
  controllers: [AdminCommentController],
  providers: [AdminCommentService, CommentDataAccess],
})
export class AdminCommentModule {}
