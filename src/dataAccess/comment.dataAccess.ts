import { Identifier } from 'sequelize';
import * as Models from '../model/index';
import { HttpException } from '@nestjs/common';
import { count } from 'console';

export class CommentDataAccess {
  tableName() {
    return Models.Comment.tableName;
  }
  async findById(id: number): Promise<Models.Comment> {
    return await Models.Comment.findByPk(id);
  }
  async createComment(
    userId: number,
    productId: number,
    comment: string,
  ): Promise<Models.Comment> {
    const usercomment = await Models.Comment.create({
      userId,
      productId,
      comment,
      isPublish: false,
    });
    return usercomment;
  }

  async publish(id: number) {
    return await Models.Comment.update(
      {
        isPublish: true,
      },
      { where: { id } },
    );
  }

  async updateComment(id: number, userId: number, comment: string) {
    return await Models.Comment.update(
      {
        userId: userId,
        comment: comment,
      },
      { where: { id } },
    );
  }

  async findAllForUser(): Promise<Models.Comment[]> {
    return await Models.Comment.findAll({ where: { isPublish: true } });
  }

  async findAllForAdmin(): Promise<Models.Comment[]> {
    return await Models.Comment.findAll({ where: { isPublish: false } });
  }

  async remove(id: number): Promise<void> {
    const comment = await this.findById(id);
    return await comment.destroy();
  }
}
