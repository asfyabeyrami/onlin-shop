import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserDataAccess } from 'src/dataAccess/users.dataAccess';
import { JwtModule } from '@nestjs/jwt';
import { AdminDataAccess } from 'src/dataAccess/admin.dataAccess';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserDataAccess, AdminDataAccess],
})
export class AuthModule {}
