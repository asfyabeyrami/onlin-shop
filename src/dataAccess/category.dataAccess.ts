import { Identifier } from 'sequelize';
import * as Models from '../model/index';
import { HttpException } from '@nestjs/common';

export class CatDataAccess {
  tableName() {
    return Models.Category.tableName;
  }

  async createCategory(
    adminId: number,
    title: string,
    fatherId: number,
  ): Promise<Models.Category> {
    const category = await Models.Category.create({
      adminId,
      title,
      fatherId,
    });
    return category;
  }
}
