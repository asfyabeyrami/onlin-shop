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

  findAll() {
    return `This action returns all province`;
  }

  findOne(id: number) {
    return `This action returns a #${id} province`;
  }

  // update(id: number, updateProvinceDto: UpdateProvinceDto) {
  //   return `This action updates a #${id} province`;
  // }

  remove(id: number) {
    return `This action removes a #${id} province`;
  }
}
