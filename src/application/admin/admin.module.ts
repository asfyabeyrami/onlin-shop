import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminDataAccess } from 'src/dataAccess/admin.dataAccess';

@Module({
  controllers: [AdminController],
  providers: [AdminService, AdminDataAccess],
})
export class AdminModule {}
