import { Injectable } from '@nestjs/common';
import { Identifier } from 'sequelize';
import { AdminDataAccess } from 'src/dataAccess/admin.dataAccess';

@Injectable()
export class AdminService {
  constructor(private readonly dataAccess: AdminDataAccess) {}
  // create(createAdminDto: CreateAdminDto) {
  //   return 'This action adds a new admin';
  // }

  async findAll() {
    const users = await this.dataAccess.findAll();
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  // update(id: number, updateAdminDto: UpdateAdminDto) {
  //   return `This action updates a #${id} admin`;
  // }

  async logOut(id: number) {
    return await this.dataAccess.logOut(id);
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
