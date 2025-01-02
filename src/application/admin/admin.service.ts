import { Injectable } from '@nestjs/common';
import { Identifier } from 'sequelize';
import { AdminDataAccess } from 'src/dataAccess/admin.dataAccess';

@Injectable()
export class AdminService {
  constructor(private readonly DataAccess: AdminDataAccess) {}
  // create(createAdminDto: CreateAdminDto) {
  //   return 'This action adds a new admin';
  // }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  // update(id: number, updateAdminDto: UpdateAdminDto) {
  //   return `This action updates a #${id} admin`;
  // }

  async logOut(adminId: Identifier) {
    await this.DataAccess.logOut(adminId);
    return;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
