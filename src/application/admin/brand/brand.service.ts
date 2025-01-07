import { Injectable, Logger } from '@nestjs/common';
import { BrandDataAccess } from 'src/dataAccess/brand.dataAccess';
import { UpdateBrandDto } from 'src/DTO/brand.dto';

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

  async findAll() {
    return await this.brandDataAccess.findAll();
  }

  async findOne(id: number) {
    return await this.brandDataAccess.findById(id);
  }

  async update(id: number, adminId: number, updateBrandDto: UpdateBrandDto) {
    const { brandName, picUrl, description } = updateBrandDto;
    try {
      await this.brandDataAccess.updateBrand(
        id,
        adminId,
        brandName,
        picUrl,
        description,
      );
      return 'brand updated';
    } catch (error) {
      throw new Logger(error);
    }
  }

  async findWithName(brandName: string) {
    return await this.brandDataAccess.findByName(brandName);
  }

  async remove(id: number) {
    return await this.brandDataAccess.remove(id);
  }
}
