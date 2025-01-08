import { Injectable } from '@nestjs/common';
import { BrandDataAccess } from 'src/dataAccess/brand.dataAccess';

@Injectable()
export class BrandsService {
  constructor(private readonly brandDataAccess: BrandDataAccess) {}

  async findAll() {
    return await this.brandDataAccess.findAll();
  }

  async findOne(id: number) {
    return await this.brandDataAccess.findById(id);
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
