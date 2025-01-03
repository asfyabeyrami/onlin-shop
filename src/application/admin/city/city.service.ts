import { Injectable } from '@nestjs/common';

@Injectable()
export class CityService {
  // create(createCityDto: CreateCityDto) {
  //   return 'This action adds a new city';
  // }

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
