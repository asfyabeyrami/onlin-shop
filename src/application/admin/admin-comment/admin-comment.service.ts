import { Injectable } from '@nestjs/common';
import { CommentDataAccess } from 'src/dataAccess/comment.dataAccess';

@Injectable()
export class AdminCommentService {
  constructor(private readonly commentDataAccess: CommentDataAccess) {}

  async findAll() {
    return await this.commentDataAccess.findAllForAdmin();
  }

  async findAllCommentAsProductId(productId: number) {
    return await this.commentDataAccess.findByproductId(productId);
  }

  async findOneComment(id: number) {
    console.log('commmmasdnjhbksdfu');

    return await this.commentDataAccess.findById(id);
  }

  async update(id: number) {
    return await this.commentDataAccess.publish(id);
  }

  async remove(id: number) {
    return await this.commentDataAccess.remove(id);
  }
}
