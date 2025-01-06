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

  async findAll(): Promise<Models.City[]> {
    return await Models.City.findAll();
  }

  async findAllProvince(): Promise<Models.Province[]> {
    return await Models.Province.findAll();
  }

  async findById(id: number): Promise<Models.City> {
    return await Models.City.findByPk(id);
  }

  async findByIdProvince(id: number): Promise<Models.Province> {
    return await Models.Province.findByPk(id);
  }

  async remove(id: number): Promise<void> {
    const city = await this.findById(id);
    return await city.destroy();
  }

  async removeProvince(id: number): Promise<void> {
    const province = await this.findByIdProvince(id);
    return await province.destroy();
  }
}
