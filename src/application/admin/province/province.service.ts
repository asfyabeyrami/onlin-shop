import { Injectable } from '@nestjs/common';
import { ProvinceDataAccess } from 'src/dataAccess/province.dataAccess';
import { CreateProvinceDto } from 'src/DTO/address.dto';

@Injectable()
export class ProvinceService {
  constructor(private readonly provinceDataAccess: ProvinceDataAccess) {}
  async create(adminId: number, createProvinceDto: CreateProvinceDto) {
    const { province } = createProvinceDto;
    return await this.provinceDataAccess.createProvince(adminId, province);
  }

  async findAll() {
    return await this.provinceDataAccess.findAllProvince();
  }

  async remove(id: number) {
    return await this.provinceDataAccess.removeProvince(id);
  }
}
