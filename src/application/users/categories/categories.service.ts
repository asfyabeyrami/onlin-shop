import { Injectable } from '@nestjs/common';
import { CatDataAccess } from 'src/dataAccess/category.dataAccess';

@Injectable()
export class CategoriesService {
  constructor(private readonly catDataAccess: CatDataAccess) {}

  async findAll() {
    return await this.catDataAccess.findAll();
  }

  async findOne(id: number) {
    return await this.catDataAccess.findById(id);
  }
}
