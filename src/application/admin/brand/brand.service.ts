import { Injectable } from '@nestjs/common';
import { BrandDataAccess } from 'src/dataAccess/brand.dataAccess';

@Injectable()
export class BrandService {
  constructor(private readonly brandDataAccess: BrandDataAccess) {}
  async create(
    adminId: number,
    brandName: string,
    picUrl: string,
    description: string,
  ) {
    return await this.brandDataAccess.createBrand(
      adminId,
      brandName,
      picUrl,
      description,
    );
  }

  findAll() {
    return `This action returns all brand`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  // update(id: number, updateBrandDto: UpdateBrandDto) {
  //   return `This action updates a #${id} brand`;
  // }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
