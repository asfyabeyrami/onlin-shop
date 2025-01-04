import { Identifier } from 'sequelize';
import * as Models from '../model/index';
import { HttpException } from '@nestjs/common';

export class UserDataAccess {
  tableName() {
    return Models.User.tableName;
  }

  async createUser(
    name: string,
    lastName: string,
    mobile: number,
    password: string,
  ): Promise<Models.User> {
    const user = await Models.User.create({
      name,
      lastName,
      mobile,
      password,
      isActive: true,
    });
    return user;
  }
  async deActiveUser(id: number) {
    return await Models.User.update({ isActive: false }, { where: { id } });
  }

  async updateJwtToken(jwtToken: string, id: Identifier) {
    await Models.User.update(
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
    await Models.User.update(
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

  async findByMobile(mobile: number): Promise<Models.User> {
    const user = await Models.User.findOne({
      where: {
        mobile,
      },
    });
    return user;
  }

  async findByPass(password: string): Promise<Models.User> {
    const user = await Models.User.findOne({
      where: {
        password,
      },
    });
    return user;
  }

  async findAll(): Promise<Models.User[]> {
    return await Models.User.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  async findById(id: number): Promise<Models.User> {
    const user = await Models.User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    return user;
  }

  async remove(id: number): Promise<void> {
    const user = await Models.User.findByPk(id);
    if (!user) {
      throw new HttpException('user not found', 404);
    } else {
      await user.destroy();
    }
  }
}
