import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentDataAccess } from 'src/dataAccess/comment.dataAccess';

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommentDataAccess],
})
export class CommentModule {}
