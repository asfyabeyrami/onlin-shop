import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserDataAccess } from 'src/dataAccess/users.dataAccess';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AdminDataAccess } from 'src/dataAccess/admin.dataAccess';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'YOUR_STRONG_SECRET_KEY',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserDataAccess, AdminDataAccess],
})
export class AuthModule {}
