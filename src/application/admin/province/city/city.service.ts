import { Injectable } from '@nestjs/common';
import { ProvinceDataAccess } from 'src/dataAccess/province.dataAccess';
import { CreateCityDto } from 'src/DTO/address.dto';

@Injectable()
export class CityService {
  constructor(private readonly provinceDataAccess: ProvinceDataAccess) {}
  async create(createCityDto: CreateCityDto) {
    const { provinceId, city } = createCityDto;
    return await this.provinceDataAccess.createCity(provinceId, city);
  }

  findAll() {
    return `This action returns all city`;
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  // update(id: number, updateCityDto: UpdateCityDto) {
  //   return `This action updates a #${id} city`;
  // }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
