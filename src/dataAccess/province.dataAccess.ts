import { Identifier } from 'sequelize';
import * as Models from '../model/index';
import { HttpException } from '@nestjs/common';

export class ProvinceDataAccess {
  tableName() {
    return Models.Province.tableName;
  }

  async createProvince(
    adminId: number,
    province: string,
  ): Promise<Models.Province> {
    const result = await Models.Province.create({
      adminId,
      province,
    });
    return result;
  }

  async createCity(provinceId: number, city: string): Promise<Models.City> {
    const result = await Models.City.create({
      provinceId,
      city,
    });
    return result;
  }
}
