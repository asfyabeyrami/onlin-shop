import { Identifier } from 'sequelize';
import * as Models from '../model/index';

export class UserDataAccess {
  tableName() {
    return Models.User.tableName;
  }

  async createUser() {
    const user = await Models.User.create({});
    return user;
  }
}
