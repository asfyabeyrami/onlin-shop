import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminDataAccess } from 'src/dataAccess/admin.dataAccess';
import { KavenegarService } from 'src/application/auth/kavenegar/kavenegar.service';
import { UserDataAccess } from 'src/dataAccess/users.dataAccess';
import {
  AdminDto,
  adminObj,
  LoginAdminDto,
  RegisterAdminDto,
} from 'src/DTO/admin.dto';
import { LoginUserDto, RegisterUserDto, UserDto } from 'src/DTO/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userDataAccess: UserDataAccess,
    private readonly adminDataAccess: AdminDataAccess,
    private readonly kavenegarService: KavenegarService,
    private readonly jwtService: JwtService,
  ) {}

  async register(payload: RegisterUserDto): Promise<UserDto> {
    const { name, lastName, mobile } = payload;

    if (!name || !lastName || !mobile) {
      throw new HttpException('همه فیلد ها الزامیست', 404);
    }

    const mobileChecking = await this.userDataAccess.findByMobile(mobile);

    if (mobileChecking) {
      throw new HttpException('شماره مبایل تکراری میباشد', 404);
    }

    const user = await this.userDataAccess.createUser(name, lastName, mobile);
    return user;
  }

  async login(loginData: LoginUserDto): Promise<{
    status: number;
    massege?: string;
    error?: string;
  }> {
    const { mobile } = loginData;
    if (!mobile) {
      throw new HttpException(' فیلد الزامیست', 404);
    }

    const user = await this.userDataAccess.findByMobile(mobile);
    if (!user) {
      throw new HttpException('کاربر وجود ندارد', 404);
    }

    const payload = {
      sub: user.id,
      mobile: user.mobile,
      role: user.role,
    };

    const token = await this.jwtService.signAsync(payload);

    await this.userDataAccess.updateJwtToken(token, user.id);

    const reslut = {
      status: 200,
      name: user.name,
      error: null,
      accessToken: token,
    };
    return reslut;
  }

  async registerAdmin(payload: RegisterAdminDto) {
    const { userName, password } = payload;

    if (!userName || !password) {
      throw new HttpException('همه فیلد ها الزامیست', 404);
    }

    const adminChecking = await this.adminDataAccess.findByUserName(userName);
    if (adminChecking) {
      throw new HttpException('نام کاربری تکراری میباشد', 404);
    }

    const passChecking = await this.adminDataAccess.findByPass(password);
    if (passChecking) {
      throw new HttpException('پسورد تکراری میباشد', 404);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await this.adminDataAccess.createAdmin(
      userName,
      hashedPassword,
    );
    return admin;
  }

  async loginAdmin(payload: LoginAdminDto): Promise<AdminDto> {
    const { userName, password } = payload;
    if (!userName || !password) {
      throw new HttpException('همه فیلد ها الزامیست', 404);
    }

    const admin = await this.adminDataAccess.findByUserName(userName);
    if (!admin) {
      throw new HttpException('ادمین وجود ندارد', 404);
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      throw new HttpException('پسورد صحیح نمی باشد', 404);
    }
    const token = await this.jwtService.signAsync({
      sub: admin.id,
      userName: admin.userName,
      role: admin.role,
    });
    await this.adminDataAccess.updateJwtToken(token, admin.id);

    return adminObj(admin, token);
  }

  async logOutAdmin(id: number) {
    return await this.adminDataAccess.logOut(id);
  }

  async logOutUser(id: number) {
    return await this.userDataAccess.logOut(id);
  }

  async sendVerificationCode(mobile: string, code: string) {
    try {
      return await this.kavenegarService.verifyLookup({
        receptor: mobile,
        token: code,
        template: 'your-verification-template',
      });
    } catch (error) {
      // handle error
    }
  }

  async deActiveUser(id: number) {
    return await this.userDataAccess.deActiveUser(id);
  }
}
