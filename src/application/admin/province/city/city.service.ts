import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminDataAccess } from 'src/dataAccess/admin.dataAccess';
import { ProvinceDataAccess } from 'src/dataAccess/province.dataAccess';
import { CreateCityDto, UpdateCityDto } from 'src/DTO/address.dto';

@Injectable()
export class CityService {
  constructor(
    private readonly provinceDataAccess: ProvinceDataAccess,
    private readonly adminDataAccess: AdminDataAccess,
  ) {}
  async create(adminId: number, createCityDto: CreateCityDto) {
    const { provinceId, city } = createCityDto;
    const checkAdmin = await this.adminDataAccess.findById(adminId);
    if (!checkAdmin) {
      throw new UnauthorizedException('دسترسی ندارید');
    }
    return await this.provinceDataAccess.createCity(provinceId, city);
  }

  async findAll() {
    return await this.provinceDataAccess.findAll();
  }

  async remove(id: number) {
    return await this.provinceDataAccess.remove(id);
  }
}
