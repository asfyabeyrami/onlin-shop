import { Injectable } from '@nestjs/common';
import { UserDataAccess } from 'src/dataAccess/users.dataAccess';

@Injectable()
export class UsersService {
  constructor(private readonly dataAccess: UserDataAccess) {}
  create() {
    return 'This action adds a new user';
  }

  async findAll() {
    const user = await this.dataAccess.findAll();
    return user;
  }

  async findOne(id: number) {
    return await this.dataAccess.findById(id);
  }

  async deActiveUser(id: number) {
    return await this.dataAccess.deActiveUser(id);
  }

  async remove(id: number) {
    return await this.dataAccess.remove(id);
  }
}
