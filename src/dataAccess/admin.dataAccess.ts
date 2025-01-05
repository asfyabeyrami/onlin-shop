import { Identifier } from 'sequelize';
import * as Models from '../model/index';
import { HttpException } from '@nestjs/common';

export class AdminDataAccess {
  tableName() {
    return Models.Admin.tableName;
  }

  async createAdmin(userName: string, password: string): Promise<Models.Admin> {
    const admin = await Models.Admin.create({
      userName,
      password,
      role: 'admin',
    });
    return admin;
  }

  async findToken(token: string) {
    const jwt = await Models.Admin.findOne({
      attributes: ['jwtToken'],
      where: {
        jwtToken: token,
      },
    });
    return jwt?.jwtToken;
  }

  async updateJwtToken(jwtToken: string, id: Identifier) {
    await Models.Admin.update(
      {
        jwtToken,
      },
      {
        where: {
          id,
        },
      },
    );
  }

  async logOut(id: number) {
    await Models.Admin.update(
      {
        jwtToken: null,
      },
      {
        where: {
          id,
        },
      },
    );
  }

  async findAll(): Promise<Models.Admin[]> {
    return await Models.Admin.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  async findById(id: number): Promise<Models.Admin> {
    const admin = await Models.Admin.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    return admin;
  }

  async findByUserName(userName: string) {
    const admin = await Models.Admin.findOne({
      where: {
        userName,
      },
    });
    return admin;
  }

  async findByPass(password: string): Promise<Models.Admin> {
    const admin = await Models.Admin.findOne({
      where: {
        password,
      },
    });
    return admin;
  }

  async remove(id: number): Promise<void> {
    const admin = await Models.Admin.findByPk(id);
    if (!admin) {
      throw new HttpException('user not found', 404);
    } else {
      await admin.destroy();
    }
  }
}
