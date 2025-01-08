import { Injectable, Logger } from '@nestjs/common';
import { CatDataAccess } from 'src/dataAccess/category.dataAccess';
import { UpdateCategoryDto } from 'src/DTO/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly catDataAccess: CatDataAccess) {}
  async create(adminId: number, title: string, fatherId: number) {
    return await this.catDataAccess.createCategory(adminId, title, fatherId);
  }

  async findAllAsCat(category: string) {
    const catProduct = await this.catDataAccess.findAllAsCat(category);
    return catProduct;
  }

  async findAll() {
    return await this.catDataAccess.findAll();
  }

  async findOne(id: number) {
    return await this.catDataAccess.findOne(id);
  }

  async update(
    id: number,
    adminId: number,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const { fatherId, title } = updateCategoryDto;
    try {
      await this.catDataAccess.updateCategory(id, adminId, fatherId, title);
      return 'cat updated';
    } catch (error) {
      throw new Logger(error);
    }
  }

  async remove(id: number) {
    return await this.catDataAccess.remove(id);
  }
}
