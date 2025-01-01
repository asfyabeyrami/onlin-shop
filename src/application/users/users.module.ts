import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserDataAccess } from 'src/dataAccess/users.dataAccess';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/model';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UserDataAccess],
})
export class UsersModule {}
