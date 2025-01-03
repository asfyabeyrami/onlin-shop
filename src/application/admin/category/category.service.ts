import { Injectable } from '@nestjs/common';
import { CatDataAccess } from 'src/dataAccess/category.dataAccess';

@Injectable()
export class CategoryService {
  constructor(private readonly catDataAccess: CatDataAccess) {}
  async create(adminId: number, title: string, fatherId: number) {
    return await this.catDataAccess.createCategory(adminId, title, fatherId);
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  // update(id: number, updateCategoryDto: UpdateCategoryDto) {
  //   return `This action updates a #${id} category`;
  // }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
