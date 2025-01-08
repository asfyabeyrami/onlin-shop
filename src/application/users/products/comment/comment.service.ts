import { Injectable } from '@nestjs/common';
import { CommentDataAccess } from 'src/dataAccess/comment.dataAccess';
import { CreateCommentDto, UpdateCommentDto } from 'src/DTO/product.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentDataAccess: CommentDataAccess) {}

  async create(userId: number, createCommentDto: CreateCommentDto) {
    const { productId, comment } = createCommentDto;
    return await this.commentDataAccess.createComment(
      userId,
      productId,
      comment,
    );
  }

  async update(id: number, userId: number, updateCommentDto: UpdateCommentDto) {
    return await this.commentDataAccess.updateComment(
      id,
      userId,
      updateCommentDto.comment,
    );
  }

  async remove(id: number) {
    return await this.commentDataAccess.remove(id);
  }
}
